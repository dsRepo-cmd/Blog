import { classNames } from "@/shared/lib/classNames";
import cls from "./Navbar.module.scss";
import { useState, useCallback, memo } from "react";
import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { AvatarDropdown } from "@/features/avatarDropdown";
import { NotificationButton } from "@/features/notificationButton";
import Button from "@/shared/ui/redesigned/Button/Button";
import { SignInModal, SignupModal } from "@/features/AuthByUsername";

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();

  const [isSignin, setSignin] = useState(false);
  const [isSignup, setSignup] = useState(false);
  const authData = useSelector(getUserAuthData);

  const onCloseSigninModal = useCallback(() => {
    setSignin(false);
  }, []);

  const onShowSigninModal = useCallback(() => {
    setSignin(true);
  }, []);

  const onCloseSignupModal = useCallback(() => {
    setSignup(false);
  }, []);

  const onShowSignupModal = useCallback(() => {
    setSignup(true);
  }, []);

  const mainClass = cls.NavbarRedesigned;

  if (authData) {
    return (
      <header className={classNames(mainClass, {}, [className])}>
        <HStack gap="16" className={cls.actions}>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
      </header>
    );
  }

  return (
    <header className={classNames(mainClass, {}, [className])}>
      <HStack gap="12">
        <Button
          variant={"filled"}
          className={cls.links}
          onClick={onShowSignupModal}
        >
          {t("Sign up")}
        </Button>
        <Button
          variant={"outline"}
          className={cls.links}
          onClick={onShowSigninModal}
        >
          {t("Sign in")}
        </Button>
      </HStack>

      {isSignin && (
        <SignInModal isOpen={isSignin} onClose={onCloseSigninModal} />
      )}
      {isSignup && (
        <SignupModal isOpen={isSignup} onClose={onCloseSignupModal} />
      )}
    </header>
  );
});
