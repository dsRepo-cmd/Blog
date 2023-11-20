import { classNames } from "shared/lib/classNames";
import cls from "./Navbar.module.scss";

import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { LoginModal } from "features/AuthByUsername";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuthData, userActions } from "entities/User";

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC = ({ className }: NavbarProps) => {
  const [isAuthModal, setAuthModal] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

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
      <div className={classNames(cls.navbar, {}, [className])}>
        <Button
          onClick={onLogout}
          theme={ButtonTheme.OUTLINE}
          className={classNames(cls.links)}
        >
          {t("Exit")}
        </Button>
      </div>
    );
  }

  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <Button
        onClick={onShowModal}
        theme={ButtonTheme.OUTLINE}
        className={classNames(cls.links)}
      >
        {t("Enter")}
      </Button>

      <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
    </div>
  );
};
