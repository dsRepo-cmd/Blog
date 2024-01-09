import React, { memo, useCallback } from "react";
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
import { VStack } from "@/shared/ui/redesigned/Stack";
import Text from "@/shared/ui/redesigned/Text/Text";
import Input from "@/shared/ui/redesigned/Input/Input";
import Button from "@/shared/ui/redesigned/Button/Button";

import { ValidateAuthError } from "../../model/const/const";

import { getSignUpCode } from "../../model/selectors/getSignUpCode/getSignUpCode";
import { confirmCode } from "../../model/services/confirmCode/confirmCode";
import { signUpByEmail } from "../../model/services/signUpByEmail/signUpByEmail";
import { getConfirmCode } from "../../model/selectors/getConfirmCode/getConfirmCode";
import { getLoginToken } from "../../model/selectors/getLoginToken/getLoginToken";

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
    const code = useSelector(getSignUpCode);
    const codeConfirm = useSelector(getConfirmCode);
    const isLoading = useSelector(getLoginIsLoading);
    const token = useSelector(getLoginToken);

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

    const onLoginClick = useCallback(async () => {
      const signUpResult = await dispatch(signUpByEmail({ email, password }));

      if (signUpResult.meta.requestStatus === "fulfilled") {
        // onSuccess();
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

    // ============================================================================
    const onChangeCode = useCallback(
      (value: string) => {
        dispatch(loginActions.setCode(value));
      },
      [dispatch]
    );

    const onConfirmClick = useCallback(async () => {
      const codeResult = await dispatch(confirmCode({ code, email, token }));

      if (codeResult.meta.requestStatus === "fulfilled") {
        onSuccess();
      }
    }, [onSuccess, dispatch, email, code]);
    // ============================================================================

    const confirmfield = (
      <>
        <Input
          type="text"
          name={"number"}
          className={cls.input}
          placeholder={t("Enter your code")}
          onChange={onChangeCode}
          onKeyDown={handleKeyPress}
          value={code}
          error={
            validateErrors?.code &&
            validateErrorTranslates[validateErrors?.code]
          }
        />
        <Text text={codeConfirm} />
        <Button
          className={cls.loginBtn}
          onClick={onConfirmClick}
          disabled={isLoading}
        >
          {t("Confirm")}
        </Button>
      </>
    );

    const loginForm = (
      <VStack gap="16" className={classNames(cls.SignUpForm, {}, [className])}>
        <Text title={t("Sign up form")} />

        <Input
          name={"email"}
          autofocus
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
          className={cls.loginBtn}
          onClick={onLoginClick}
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
        {confirmfield}
      </VStack>
    );

    return (
      <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
        {loginForm}
      </DynamicModuleLoader>
    );
  }
);

export default SignUpForm;
