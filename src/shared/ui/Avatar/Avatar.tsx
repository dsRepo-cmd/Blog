import React, { useMemo, CSSProperties } from "react";
import { Mods, classNames } from "shared/lib/classNames";
import cls from "./Avatar.module.scss";

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

const Avatar: React.FC<AvatarProps> = ({ className, src, size, alt }) => {
  const styles = useMemo<CSSProperties>(
    () => ({
      width: size || 100,
      height: size || 100,
    }),
    [size]
  );

  const mods: Mods = {};

  return (
    <img
      src={src}
      alt={alt}
      style={styles}
      className={classNames(cls.Avatar, mods, [className])}
    />
  );
};

export default Avatar;
