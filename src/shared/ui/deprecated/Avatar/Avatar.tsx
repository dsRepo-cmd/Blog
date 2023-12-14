import React, { useMemo, CSSProperties } from "react";
import { Mods, classNames } from "@/shared/lib/classNames";
import cls from "./Avatar.module.scss";
import AppImage from "../../redesigned/AppImage/AppImage";
import UserIcon from "../../../assets/icons/circle-user.svg";
import Skeleton from "../Skeleton/Skeleton";
import { Icon } from "../Icon/Icon";

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
  fallbackInverted?: boolean;
}

/**
 * Outdated, use new components from the redesigned folder
 * @deprecated
 */

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
