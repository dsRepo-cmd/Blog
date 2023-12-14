import React, { ReactNode } from "react";
import { Mods, classNames } from "@/shared/lib/classNames";
import cls from "./Modal.module.scss";
import Portal from "../../redesigned/Portal/Portal";
import Overlay from "../../redesigned/Overlay/Overlay";
import { useModal } from "@/shared/lib/hooks/useModal/useModal";
import useTheme from "@/shared/lib/hooks/useTheme/useTheme";

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 300;
/**
 * Outdated, use new components from the redesigned folder
 * @deprecated
 */
const Modal: React.FC<ModalProps> = ({
  className,
  children,
  isOpen,
  onClose,
  lazy,
}: ModalProps) => {
  const { close, isClosing, isMounted } = useModal({
    animationDelay: ANIMATION_DELAY,
    onClose,
    isOpen,
  });

  const { theme } = useTheme();

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div
        className={classNames(cls.Modal, mods, [className, theme, "app_modal"])}
      >
        <Overlay onClick={close} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
};

export default Modal;
