import { classNames } from "shared/lib/classNames";
import cls from "./Navbar.module.scss";

import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { useState, useCallback, memo } from "react";
import { useTranslation } from "react-i18next";
import { LoginModal } from "features/AuthByUsername";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuthData, userActions } from "entities/User";
import Text, { TextTheme } from "shared/ui/Text/Text";
import AppLink, { AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { isUserAdmin, isUserManager } from "app/providers/StoreProvider";
import { HStack } from "shared/ui/Stack";

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC = memo(({ className }: NavbarProps) => {
  const [isAuthModal, setAuthModal] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const isAdminPanelAvailable = isAdmin || isManager;

  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setAuthModal(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

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
          {isAdminPanelAvailable && (
            <AppLink
              theme={AppLinkTheme.BTN_PRIMARY}
              to={RoutePath.admin_panel}
            >
              {t("Admin panel")}
            </AppLink>
          )}

          <Button
            onClick={onLogout}
            theme={ButtonTheme.OUTLINE}
            className={classNames(cls.links)}
          >
            {t("Exit")}
          </Button>
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
