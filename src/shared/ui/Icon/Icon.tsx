import React, { memo, FC, CSSProperties } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./Icon.module.scss";

interface IconProps {
  className?: string;
  Svg: FC<React.SVGProps<SVGSVGElement>>;
  width?: string | number;
  height?: string | number;
}

const Icon: React.FC<IconProps> = ({ className, Svg, width, height }) => {
  return (
    <Svg
      width={width}
      height={height}
      className={classNames(cls.Icon, {}, [className])}
    />
  );
};

export default memo(Icon);
