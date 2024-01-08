import React, { Suspense, memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./SignInModal.module.scss";
import Modal from "@/shared/ui/redesigned/Modal/Modal";

import Loader from "@/shared/ui/redesigned/Loader/Loader";
import { SignInFormAsync } from "../SignInForm/SignInForm.async";

interface SignInModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = memo(
  ({ className, isOpen, onClose }: SignInModalProps) => {
    return (
      <Modal
        className={classNames(cls.SignInModal, {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
      >
        <Suspense fallback={<Loader />}>
          <SignInFormAsync onSuccess={onClose} />
        </Suspense>
      </Modal>
    );
  }
);

export default SignInModal;
