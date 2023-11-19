import { classNames } from "shared/lib/classNames";
import cls from "./Navbar.module.scss";
import Modal from "shared/ui/Modal/Modal";

import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC = ({ className }: NavbarProps) => {
  const [isAuthModal, setAuthModal] = useState(false);
  const { t } = useTranslation();

  const onToggleButton = useCallback(() => {
    setAuthModal((prev) => !prev);
  }, []);

  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <Button
        onClick={onToggleButton}
        theme={ButtonTheme.CLEAR_INVERTED}
        className={classNames(cls.links)}
      >
        {t("Enter")}
      </Button>
      <Modal isOpen={isAuthModal} onClose={onToggleButton}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
        pariatur repellendus nihil odit delectus similique, et molestiae debitis
        culpa aliquid deleniti rerum, omnis a id nisi fugiat, tempora
        dignissimos minima.
      </Modal>
    </div>
  );
};
