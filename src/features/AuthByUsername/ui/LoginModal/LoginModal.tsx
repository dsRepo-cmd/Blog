import React from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./LoginModal.module.scss";
import Modal from "shared/ui/Modal/Modal";
import LoginForm from "../LoginForm/LoginForm";

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  className,
  isOpen,
  onClose,
}: LoginModalProps) => {
  return (
    <Modal
      className={classNames(cls.LoginModal, {}, [className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <LoginForm />
    </Modal>
  );
};

export default LoginModal;
