import React, { Suspense, memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import Modal from "@/shared/ui/redesigned/Modal/Modal";
import Loader from "@/shared/ui/redesigned/Loader/Loader";
import { SignInFormAsync } from "../SignInForm/SignInForm.async";
import { BrowserView, MobileView } from "react-device-detect";
import { Drawer } from "@/shared/ui/redesigned/Drawer/Drawer";

interface SignInModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const LogInModal: React.FC<SignInModalProps> = memo(
  ({ className, isOpen, onClose }: SignInModalProps) => {
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
              <SignInFormAsync onSuccess={onClose} />
            </Suspense>
          </Modal>
        </BrowserView>

        <MobileView>
          <Drawer isOpen={isOpen} onClose={onClose}>
            <Suspense fallback={<Loader />}>
              <SignInFormAsync onSuccess={onClose} />
            </Suspense>
          </Drawer>
        </MobileView>
      </>
    );
  }
);
export default LogInModal;
