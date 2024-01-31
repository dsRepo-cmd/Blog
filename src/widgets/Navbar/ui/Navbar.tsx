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
import { SignInModal, SignUpModal } from "@/features/AuthByUsername";

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();

  const [isSignIn, setSignIn] = useState(false);
  const [isSignup, setSignup] = useState(false);
  const authData = useSelector(getUserAuthData);

  const onCloseSignInModal = useCallback(() => {
    setSignIn(false);
  }, []);

  const onShowSignInModal = useCallback(() => {
    setSignIn(true);
  }, []);

  const onCloseSignUpModal = useCallback(() => {
    setSignup(false);
  }, []);

  const onShowSignUpModal = useCallback(() => {
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
          onClick={onShowSignUpModal}
        >
          {t("Sign up")}
        </Button>
        <Button
          variant={"outline"}
          className={cls.links}
          onClick={onShowSignInModal}
        >
          {t("Sign in")}
        </Button>
      </HStack>

      {isSignIn && (
        <SignInModal isOpen={isSignIn} onClose={onCloseSignInModal} />
      )}
      {isSignup && (
        <SignUpModal isOpen={isSignup} onClose={onCloseSignUpModal} />
      )}
    </header>
  );
});
