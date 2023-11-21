import React, { memo, useCallback, useEffect } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./LoginForm.module.scss";
import { useTranslation } from "react-i18next";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { useSelector } from "react-redux";
import {
  loginActions,
  loginReducer,
} from "features/AuthByUsername/model/slice/loginSlise";

import { loginByUsername } from "features/AuthByUsername/model/services/loginByUsername/loginByUsername";
import Text, { TextTheme } from "shared/ui/Text/Text";
import { getLoginUsername } from "features/AuthByUsername/model/selectors/getLoginUsername/getLoginUsername";
import { getLoginPassword } from "features/AuthByUsername/model/selectors/getLoginPassword/getLoginPassword";
import { getLoginErrors } from "features/AuthByUsername/model/selectors/getLoginErrors/getLoginErrors";
import { getLoginIsLoading } from "features/AuthByUsername/model/selectors/getLoginIsLoading/getLoginIsLoading";
import DynamicModuleLoader, {
  ReducerList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";

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

    return (
      <DynamicModuleLoader reducers={initialReducers}>
        <div className={classNames(cls.LoginForm, {}, [className])}>
          <Text title={t("Authorization form")} />
          <Input
            placeholder={t("Name")}
            className={classNames(cls.input)}
            type="text"
            onChange={onChangeUsername}
            value={username}
          />
          <Input
            placeholder={t("Password")}
            className={classNames(cls.input)}
            type="text"
            onChange={onChangePassword}
            value={password}
          />
          {error && <Text text={error} theme={TextTheme.ERROR} />}
          <Button
            onClick={onLoginClick}
            theme={ButtonTheme.OUTLINE}
            className={classNames(cls.loginBtn)}
            disabled={isLoading}
          >
            {t("Enter")}
          </Button>
        </div>
      </DynamicModuleLoader>
    );
  }
);

export default LoginForm;
