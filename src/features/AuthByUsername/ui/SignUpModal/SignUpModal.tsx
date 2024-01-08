import React, { Suspense, memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./SignUpModal.module.scss";
import Modal from "@/shared/ui/redesigned/Modal/Modal";

import Loader from "@/shared/ui/redesigned/Loader/Loader";
import { SignUpFormAsync } from "../SignUpForm/SignUpForm.async";

interface SignupModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = memo(
  ({ className, isOpen, onClose }) => {
    return (
      <Modal
        className={classNames(cls.SignupModal, {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
      >
        <Suspense fallback={<Loader />}>
          <SignUpFormAsync onSuccess={onClose} />
        </Suspense>
      </Modal>
    );
  }
);

export default SignupModal;
