import React, { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./SignInForm.module.scss";
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
import { HStack, VStack } from "@/shared/ui/Stack";
import Text from "@/shared/ui/Text/Text";
import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";
import { signInByEmail } from "../../model/services/signInByEmail/signInByEmail";
import { ValidateAuthError } from "../../model/const/const";
import Loader from "@/shared/ui/Loader/Loader";
import { BrowserView, MobileView } from "react-device-detect";
import Card from "@/shared/ui/Card/Card";

export interface SignInFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducerList = {
  loginForm: loginReducer,
};

const SignInForm: React.FC<SignInFormProps> = memo(
  ({ className, onSuccess }: SignInFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const email = useSelector(getLoginEmail);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    // const isLoading = true;

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
      [ValidateAuthError.NO_DATA]: t("No data"),
    };

    ////

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

    const onSignInClick = useCallback(async () => {
      const result = await dispatch(signInByEmail({ email, password }));

      if (result.meta.requestStatus === "fulfilled") {
        onSuccess();
      }
    }, [onSuccess, dispatch, password, email]);

    const handleKeyPress = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          onSignInClick();
        }
      },
      [onSignInClick]
    );

    if (isLoading) {
      return (
        <>
          <BrowserView>
            <Loader />;
          </BrowserView>
          <MobileView>
            <Loader center />
          </MobileView>
        </>
      );
    }

    const loginForm = (
      <VStack
        align="center"
        gap="12"
        className={classNames(cls.SignInForm, {}, [className])}
      >
        <HStack
          max
          className={classNames(cls.header, {}, [className])}
          align="center"
        >
          <Text className={cls.title} align="center" title={t("SIGN IN")} />
        </HStack>

        <VStack padding="24" gap="24">
          <Input
            name={"email"}
            type="text"
            className={cls.input}
            placeholder={t("Email")}
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
            placeholder={t("Password")}
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
            onClick={onSignInClick}
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
      <DynamicModuleLoader reducers={initialReducers}>
        {loginForm}
      </DynamicModuleLoader>
    );
  }
);

export default SignInForm;
