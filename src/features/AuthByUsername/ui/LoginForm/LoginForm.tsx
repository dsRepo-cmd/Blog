import React, { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./LoginForm.module.scss";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { loginActions, loginReducer } from "../../model/slice/loginSlise";
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername";
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
import { getEmailUsername } from "../../model/selectors/geEmailUsername/geEmailUsername";
import { loginByEmail } from "../../model/services/loginByEmail/loginByEmail";
import { ValidateAuthError } from "../../model/const/const";
import { FilteredAuthError } from "../../model/types/loginSchema";
import { filterAuthErrors } from "../../model/services/filterAuthErrors/filterAuthErrors";

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

    const username = useSelector(getLoginUsername);
    const email = useSelector(getEmailUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    // Validate errors
    const validateErrors = useSelector(getLoginErrors);

    const validateErrorTranslates: { [key: string]: string } = {
      [ValidateAuthError.SERVER_ERROR]: t("Server error"),
      [ValidateAuthError.INCORRECT_EMAIL]: t("Incorrect email"),
      [ValidateAuthError.INCORRECT_PASSWORD]: t(
        "The password must be at least 8 characters long, including at least one number and an uppercase letter"
      ),
      [ValidateAuthError.NO_DATA]: t("No data"),
    };

    let FilteredError: FilteredAuthError = {
      emailError: "",
      passwordError: "",
      dataError: "",
    };

    if (validateErrors) {
      FilteredError = filterAuthErrors(validateErrors);
    }
    console.log(validateErrors);
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
    }, [onSuccess, dispatch, password, username]);

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
              FilteredError.emailError &&
              validateErrorTranslates[FilteredError.emailError]
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
              FilteredError.passwordError &&
              validateErrorTranslates[FilteredError.passwordError]
            }
          />
          <Button
            className={cls.loginBtn}
            onClick={onLoginClick}
            disabled={isLoading}
          >
            {t("Enter")}
          </Button>

          {FilteredError.dataError && (
            <Text
              variant={"error"}
              text={validateErrorTranslates[FilteredError.dataError]}
            />
          )}
        </VStack>
      </DynamicModuleLoader>
    );
  }
);

export default LoginForm;
