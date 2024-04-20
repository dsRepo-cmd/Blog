import React, { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./ConfirmForm.module.scss";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { loginActions } from "../../model/slice/loginSlise";
import { getLoginEmail } from "../../model/selectors/getLoginEmail/getLoginEmail";
import { getLoginErrors } from "../../model/selectors/getLoginErrors/getLoginErrors";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import Text from "@/shared/ui/Text/Text";
import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";
import { ValidateAuthError } from "../../model/const/const";
import { getConfirmCode } from "../../model/selectors/getConfirmCode/getConfirmCode";
import { confirmCode } from "../../model/services/confirmCode/confirmCode";
import { getSignUpCode } from "../../model/selectors/getSignUpCode/getSignUpCode";
import { getLoginToken } from "../../model/selectors/getLoginToken/getLoginToken";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import Loader from "@/shared/ui/Loader/Loader";
import { BrowserView, MobileView } from "react-device-detect";

export interface ConfirmFormProps {
  className?: string;
}

const ConfirmForm: React.FC<ConfirmFormProps> = memo(({ className }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const email = useSelector(getLoginEmail);
  const codeConfirm = useSelector(getConfirmCode);
  const isLoading = useSelector(getLoginIsLoading);
  const code = useSelector(getSignUpCode);
  const token = useSelector(getLoginToken);

  // Validate errors
  const validateErrors = useSelector(getLoginErrors);

  const validateErrorTranslates: { [key: string]: string } = {
    [ValidateAuthError.SERVER_ERROR]: t("Wrong email or code"),
    [ValidateAuthError.INCORRECT_EMAIL]: t(
      "Enter the correct value of the e-mail address"
    ),
    [ValidateAuthError.INCORRECT_CODE]: t(
      "Enter the correct value of the code"
    ),

    [ValidateAuthError.NO_DATA]: t("No data"),
  };

  // ============================================================================
  const onChangeEmail = useCallback(
    (value: string) => {
      dispatch(loginActions.setEmail(value));
    },
    [dispatch]
  );

  const onChangeCode = useCallback(
    (value: string) => {
      dispatch(loginActions.setCode(value));
    },
    [dispatch]
  );

  const onConfirmClick = useCallback(async () => {
    dispatch(confirmCode({ code, email, token }));
  }, [dispatch, email, code]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        onConfirmClick();
      }
    },
    [onConfirmClick]
  );
  ////

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

  return (
    <VStack
      align="center"
      gap="12"
      className={classNames(cls.ConfirmForm, {}, [className])}
    >
      <HStack
        max
        className={classNames(cls.header, {}, [className])}
        align="center"
      >
        <Text className={cls.title} title={t("Confirm form")} />
      </HStack>

      <VStack padding="24" gap="24">
        <Input
          name={"email"}
          type="text"
          placeholder={t("Enter your email")}
          onChange={onChangeEmail}
          onKeyDown={handleKeyPress}
          value={email}
          error={
            validateErrors?.email &&
            validateErrorTranslates[validateErrors?.email]
          }
          disabled={isLoading}
        />
        <Input
          type="text"
          name={"number"}
          placeholder={t("Enter your code")}
          onChange={onChangeCode}
          onKeyDown={handleKeyPress}
          value={code}
          error={
            validateErrors?.code &&
            validateErrorTranslates[validateErrors?.code]
          }
          disabled={isLoading}
        />
        <Text className={cls.code} text={codeConfirm} />
        {validateErrors?.data && (
          <Text
            align="center"
            variant={"error"}
            text={validateErrorTranslates[validateErrors.data]}
          />
        )}
        <Button
          size="l"
          variant={"filled"}
          className={cls.confirmBtn}
          onClick={onConfirmClick}
          disabled={isLoading}
        >
          {t("Confirm")}
        </Button>
      </VStack>
    </VStack>
  );
});

export default ConfirmForm;
