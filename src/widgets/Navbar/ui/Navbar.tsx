import { classNames } from "@/shared/lib/classNames";
import cls from "./Navbar.module.scss";
import Button, { ButtonTheme } from "@/shared/ui/Button/Button";
import { useState, useCallback, memo } from "react";
import { useTranslation } from "react-i18next";
import { LoginModal } from "@/features/AuthByUsername";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import Text, { TextTheme } from "@/shared/ui/Text/Text";
import AppLink, { AppLinkTheme } from "@/shared/ui/AppLink/AppLink";

import { HStack } from "@/shared/ui/Stack";
import { AvatarDropdown } from "@/features/avatarDropdown";
import { NotificationButton } from "@/features/notificationButton";
import { RoutePath } from "@/shared/const/router";

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();

  const [isAuthModal, setAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setAuthModal(true);
  }, []);

  if (authData) {
    return (
      <header className={classNames(cls.navbar, {}, [className])}>
        <Text
          theme={TextTheme.PRIMARY}
          title={t("App production")}
          className={cls.appName}
        />

        <HStack gap="24">
          <AppLink
            className={cls.createLink}
            theme={AppLinkTheme.BTN_PRIMARY}
            to={RoutePath.article_create}
          >
            {t("Create article")}
          </AppLink>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
      </header>
    );
  }

  return (
    <header className={classNames(cls.navbar, {}, [className])}>
      <Button
        onClick={onShowModal}
        theme={ButtonTheme.OUTLINE}
        className={classNames(cls.links)}
      >
        {t("Enter")}
      </Button>
      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
});
