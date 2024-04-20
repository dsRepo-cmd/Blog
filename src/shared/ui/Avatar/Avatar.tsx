import { CSSProperties, FC, useMemo } from "react";
import cls from "./Avatar.module.scss";
import UserIcon from "../../assets/icons/user-circle.svg";
import Skeleton from "../Skeleton/Skeleton";
import { Icon } from "../Icon/Icon";
import AppImage from "../AppImage/AppImage";
import { Mods, classNames } from "@/shared/lib/classNames";

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

const Avatar: FC<AvatarProps> = ({ className, src, size = 100, alt }) => {
  const mods: Mods = {};

  const styles = useMemo<CSSProperties>(
    () => ({
      width: size,
      height: size,
    }),
    [size]
  );

  const fallback = <Skeleton width={size} height={size} border="50%" />;
  const errorFallback = <Icon width={size} height={size} Svg={UserIcon} />;

  return (
    <AppImage
      fallback={fallback}
      errorFallback={errorFallback}
      src={src}
      alt={alt}
      style={styles}
      className={classNames(cls.Avatar, mods, [className])}
    />
  );
};

export default Avatar;
