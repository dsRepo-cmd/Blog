import React, { memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./LoginForm.module.scss";
import { useTranslation } from "react-i18next";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "features/AuthByUsername/model/slice/loginSlise";
import { getLoginState } from "features/AuthByUsername/model/selectors/getLoginState/getLoginState";
import { loginByUsername } from "features/AuthByUsername/model/services/loginByUsername/loginByUsername";
import Text, { TextTheme } from "shared/ui/Text/Text";

interface LoginFormProps {
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = memo(
  ({ className }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { username, password, error, isLoading } = useSelector(getLoginState);

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

    const onLoginClick = useCallback(() => {
      dispatch(loginByUsername({ username, password }) as any);
    }, [dispatch, username, password]);

    return (
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
    );
  }
);

export default LoginForm;
