import React, { Suspense, memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import Modal from "@/shared/ui/Modal/Modal";
import Loader from "@/shared/ui/Loader/Loader";
import { SignUpFormAsync } from "../SignUpForm/SignUpForm.async";
import { BrowserView, MobileView } from "react-device-detect";
import { Drawer } from "@/shared/ui/Drawer/Drawer";

interface SignUpModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = memo(
  ({ className, isOpen, onClose }) => {
    return (
      <>
        <BrowserView>
          <Modal
            className={classNames("", {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            lazy
          >
            <Suspense fallback={<Loader />}>
              <SignUpFormAsync onSuccess={onClose} />
            </Suspense>
          </Modal>
        </BrowserView>

        <MobileView>
          <Drawer isOpen={isOpen} onClose={onClose}>
            <Suspense fallback={<Loader />}>
              <SignUpFormAsync onSuccess={onClose} />
            </Suspense>
          </Drawer>
        </MobileView>
      </>
    );
  }
);

export default SignUpModal;
