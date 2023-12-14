import { classNames } from "@/shared/lib/classNames";
import cls from "./Navbar.module.scss";
import Button, { ButtonTheme } from "@/shared/ui/deprecated/Button/Button";
import { useState, useCallback, memo } from "react";
import { useTranslation } from "react-i18next";
import { LoginModal } from "@/features/AuthByUsername";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import Text, { TextTheme } from "@/shared/ui/deprecated/Text/Text";
import AppLink, { AppLinkTheme } from "@/shared/ui/deprecated/AppLink/AppLink";

import { HStack } from "@/shared/ui/redesigned/Stack";
import { AvatarDropdown } from "@/features/avatarDropdown";
import { NotificationButton } from "@/features/notificationButton";
import { getRouteArticleCreate } from "@/shared/const/router";
import { ToggleFeatures } from "@/shared/lib/features/ToggleFeatures/ToggleFeatures";

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
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <header className={classNames(cls.NavbarRedesigned, {}, [className])}>
            <HStack gap="16" className={cls.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
        off={
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
                to={getRouteArticleCreate()}
              >
                {t("Create article")}
              </AppLink>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
      />
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
