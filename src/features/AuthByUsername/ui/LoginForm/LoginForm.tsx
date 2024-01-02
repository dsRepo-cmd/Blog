import React, { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./LoginForm.module.scss";
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
import { VStack } from "@/shared/ui/redesigned/Stack";
import Text from "@/shared/ui/redesigned/Text/Text";
import Input from "@/shared/ui/redesigned/Input/Input";
import Button from "@/shared/ui/redesigned/Button/Button";
import { loginByEmail } from "../../model/services/loginByEmail/loginByEmail";
import { ValidateAuthError } from "../../model/const/const";

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducerList = {
  loginForm: loginReducer,
};

const LoginForm: React.FC<LoginFormProps> = memo(
  ({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const email = useSelector(getLoginEmail);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);

    // Validate errors
    const validateErrors = useSelector(getLoginErrors);

    const validateErrorTranslates: { [key: string]: string } = {
      [ValidateAuthError.SERVER_ERROR]: t("Incorrect email or password"),
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

    const onLoginClick = useCallback(async () => {
      const result = await dispatch(loginByEmail({ email, password }));

      if (result.meta.requestStatus === "fulfilled") {
        onSuccess();
      }
    }, [onSuccess, dispatch, password, email]);

    const handleKeyPress = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          onLoginClick();
        }
      },
      [onLoginClick]
    );

    return (
      <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
        <VStack gap="16" className={classNames(cls.LoginForm, {}, [className])}>
          <Text title={t("Authorization form")} />

          <Input
            name={"email"}
            autofocus
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
            className={cls.loginBtn}
            onClick={onLoginClick}
            disabled={isLoading}
          >
            {t("Enter")}
          </Button>

          {validateErrors?.data && (
            <Text
              variant={"error"}
              text={validateErrorTranslates[validateErrors.data]}
            />
          )}
        </VStack>
      </DynamicModuleLoader>
    );
  }
);

export default LoginForm;
