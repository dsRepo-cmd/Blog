import React, { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./LoginForm.module.scss";
import { useTranslation } from "react-i18next";
import ButtonDeprecated, {
  ButtonTheme,
} from "@/shared/ui/deprecated/Button/Button";
import { Input as InputDeprecated } from "@/shared/ui/deprecated/Input/Input";
import { useSelector } from "react-redux";
import { loginActions, loginReducer } from "../../model/slice/loginSlise";

import { loginByUsername } from "../../model/services/loginByUsername/loginByUsername";
import TextDeprecated, { TextTheme } from "@/shared/ui/deprecated/Text/Text";
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername";
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { getLoginErrors } from "../../model/selectors/getLoginErrors/getLoginErrors";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import DynamicModuleLoader, {
  ReducerList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { ToggleFeatures } from "@/shared/lib/features";
import { VStack } from "@/shared/ui/redesigned/Stack";
import Text from "@/shared/ui/redesigned/Text/Text";
import Input from "@/shared/ui/redesigned/Input/Input";
import Button from "@/shared/ui/redesigned/Button/Button";

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
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLoginErrors);
    const isLoading = useSelector(getLoginIsLoading);

    const onChangeUsername = useCallback(
      (value: string) => {
        dispatch(loginActions.setUsername(value));
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
      const result = await dispatch(loginByUsername({ username, password }));

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
        <ToggleFeatures
          feature="isAppRedesigned"
          on={
            <VStack
              gap="16"
              className={classNames(cls.LoginForm, {}, [className])}
            >
              <Text title={t("Authorization form")} />
              {error && (
                <Text
                  text={t("You entered an incorrect username or password")}
                  variant="error"
                />
              )}
              <Input
                autofocus
                type="text"
                className={cls.input}
                placeholder={t("Username")}
                onChange={onChangeUsername}
                value={username}
              />
              <Input
                type="text"
                className={cls.input}
                placeholder={t("Password")}
                onChange={onChangePassword}
                value={password}
              />
              <Button
                className={cls.loginBtn}
                onClick={onLoginClick}
                disabled={isLoading}
              >
                {t("Enter")}
              </Button>
            </VStack>
          }
          off={
            <div className={classNames(cls.LoginForm, {}, [className])}>
              <TextDeprecated title={t("Authorization form")} />
              {error && (
                <TextDeprecated
                  text={t("You entered an incorrect username or password")}
                  theme={TextTheme.ERROR}
                />
              )}
              <InputDeprecated
                autofocus
                type="text"
                className={cls.input}
                placeholder={t("Enter username")}
                onChange={onChangeUsername}
                value={username}
              />
              <InputDeprecated
                type="text"
                className={cls.input}
                placeholder={t("Enter password")}
                onChange={onChangePassword}
                value={password}
              />
              <ButtonDeprecated
                theme={ButtonTheme.OUTLINE}
                className={cls.loginBtn}
                onClick={onLoginClick}
                disabled={isLoading}
              >
                {t("Enter")}
              </ButtonDeprecated>
            </div>
          }
        />
      </DynamicModuleLoader>
    );
  }
);

export default LoginForm;
