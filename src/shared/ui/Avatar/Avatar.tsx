import React, { useMemo, CSSProperties } from "react";
import { Mods, classNames } from "@/shared/lib/classNames";
import cls from "./Avatar.module.scss";
import AppImage from "../AppImage/AppImage";
import UserIcon from "../../assets/icons/circle-user.svg";
import { Icon } from "../Icon/Icon";
import Skeleton from "../Skeleton/Skeleton";

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
  fallbackInverted?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  className,
  src,
  size = 100,
  alt,
  fallbackInverted,
}) => {
  const styles = useMemo<CSSProperties>(
    () => ({
      width: size,
      height: size,
    }),
    [size]
  );

  const mods: Mods = {};

  const errorFallback = (
    <Icon
      inverted={fallbackInverted}
      width={size}
      height={size}
      Svg={UserIcon}
    />
  );
  const fallback = <Skeleton width={size} height={size} border="50%" />;

  return (
    <AppImage
      errorFallback={errorFallback}
      fallback={fallback}
      src={src}
      alt={alt}
      style={styles}
      className={classNames(cls.Avatar, mods, [className])}
    />
  );
};

export default Avatar;
