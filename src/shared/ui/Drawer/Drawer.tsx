import React, { memo, ReactNode } from "react";
import { classNames, Mods } from "shared/lib/classNames";
import cls from "./Drawer.module.scss";

import Portal from "../Portal/Portal";
import Overlay from "../Overlay/Overlay";
import { useTheme } from "app/providers/ThemeProvider";

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const Drawer: React.FC<DrawerProps> = ({
  className,
  children,
  isOpen,
  onClose,
}) => {
  const { theme } = useTheme();

  const mods: Mods = {
    [cls.opened]: isOpen,
  };
  return (
    <Portal>
      <div
        className={classNames(cls.Drawer, mods, [
          className,
          theme,
          "app_drawer",
        ])}
      >
        <Overlay onClick={onClose} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
};

export default memo(Drawer);
