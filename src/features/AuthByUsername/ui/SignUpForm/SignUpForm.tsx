import React, { memo, useCallback, useState } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./SignUpForm.module.scss";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { loginActions, loginReducer } from "../../model/slice/loginSlise";
import { getLoginEmail } from "../../model/selectors/getLoginEmail/getLoginEmail";
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { getLoginErrors } from "../../model/selectors/getLoginErrors/getLoginErrors";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import DynamicModuleLoader, {
  ReducerList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import Text from "@/shared/ui/redesigned/Text/Text";
import Input from "@/shared/ui/redesigned/Input/Input";
import Button from "@/shared/ui/redesigned/Button/Button";
import { ValidateAuthError } from "../../model/const/const";
import { signUpByEmail } from "../../model/services/signUpByEmail/signUpByEmail";
import ConfirmForm from "../ConfirmForm/ConfirmForm";
import Loader from "@/shared/ui/redesigned/Loader/Loader";

export interface SignUpFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducerList = {
  loginForm: loginReducer,
};

const SignUpForm: React.FC<SignUpFormProps> = memo(
  ({ className, onSuccess }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const email = useSelector(getLoginEmail);
    const password = useSelector(getLoginPassword);
    const [isConfirm, setConfirm] = useState(false);

    const isLoading = useSelector(getLoginIsLoading);

    // Validate errors
    const validateErrors = useSelector(getLoginErrors);

    const validateErrorTranslates: { [key: string]: string } = {
      [ValidateAuthError.SERVER_ERROR]: t("Wrong email or password"),
      [ValidateAuthError.INCORRECT_EMAIL]: t(
        "Enter the correct value of the e-mail address"
      ),
      [ValidateAuthError.INCORRECT_PASSWORD]: t(
        "The password must be at least 8 characters long, including at least one number and an uppercase letter"
      ),
      [ValidateAuthError.INCORRECT_CODE]: t(
        "The code must have a 4-digit number"
      ),
      [ValidateAuthError.NO_DATA]: t("No data"),
    };

    ////============================================================================

    const onChangeEmail = useCallback(
      (value: string) => {
        dispatch(loginActions.setEmail(value));
      },
      [dispatch]
    );

    const onChangePassword = useCallback(
      (value: string) => {
        dispatch(loginActions.setPassword(value));
      },
      [dispatch]
    );

    const onSignIClick = useCallback(async () => {
      const signUpResult = await dispatch(signUpByEmail({ email, password }));

      if (signUpResult.meta.requestStatus === "fulfilled") {
        setConfirm(true);
      }
    }, [onSuccess, dispatch, password, email]);

    const handleKeyPress = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          onSignIClick();
        }
      },
      [onSignIClick]
    );

    // ============================================================================
    if (isLoading) {
      return <Loader />;
    }
    // ============================================================================

    const signUpForm = (
      <VStack gap="12" className={classNames(cls.SignUpForm, {}, [className])}>
        <HStack
          max
          className={classNames(cls.header, {}, [className])}
          align="center"
        >
          <Text className={cls.title} align="center" title={t("SIGN UP")} />
        </HStack>

        <VStack padding="24" gap="24">
          <Input
            name={"email"}
            type="text"
            className={cls.input}
            placeholder={t("Enter your email")}
            onChange={onChangeEmail}
            onKeyDown={handleKeyPress}
            value={email}
            error={
              validateErrors?.email &&
              validateErrorTranslates[validateErrors?.email]
            }
          />
          <Input
            type="text"
            name={"password"}
            className={cls.input}
            placeholder={t("Enter your password")}
            onChange={onChangePassword}
            onKeyDown={handleKeyPress}
            value={password}
            password
            error={
              validateErrors?.password &&
              validateErrorTranslates[validateErrors?.password]
            }
          />

          <Button
            size="l"
            variant={"filled"}
            className={cls.loginBtn}
            onClick={onSignIClick}
            disabled={isLoading}
          >
            {t("Sign in")}
          </Button>

          {validateErrors?.data && (
            <Text
              variant={"error"}
              text={validateErrorTranslates[validateErrors.data]}
            />
          )}
        </VStack>
      </VStack>
    );

    return (
      <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
        {!isConfirm && signUpForm}
        {isConfirm && <ConfirmForm />}
      </DynamicModuleLoader>
    );
  }
);

export default SignUpForm;
