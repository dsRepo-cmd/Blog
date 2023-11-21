import React, { Suspense, memo } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./LoginModal.module.scss";
import Modal from "shared/ui/Modal/Modal";

import Loader from "shared/ui/Loader/Loader";

import { LoginFormAsync } from "../LoginForm/LoginForm.async";

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = memo(
  ({ className, isOpen, onClose }: LoginModalProps) => {
    return (
      <Modal
        className={classNames(cls.LoginModal, {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
      >
        <Suspense fallback={<Loader />}>
          <LoginFormAsync onSuccess={onClose} />
        </Suspense>
      </Modal>
    );
  }
);

export default LoginModal;
