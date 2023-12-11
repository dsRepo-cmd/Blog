import React, { memo } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./Overlay.module.scss";

interface OverlayProps {
  className?: string;
  onClick?: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={classNames(cls.Overlay, {}, [className])}
    />
  );
};

export default memo(Overlay);
