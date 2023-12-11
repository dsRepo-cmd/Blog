import React, { memo, FC } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./Icon.module.scss";

interface IconProps {
  className?: string;
  Svg: FC<React.SVGProps<SVGSVGElement>>;
  width?: string | number;
  height?: string | number;
  inverted?: boolean;
}

const Icon: React.FC<IconProps> = ({
  className,
  Svg,
  width = "30",
  height = "30",
  inverted,
}) => {
  return (
    <Svg
      width={width}
      height={height}
      className={classNames(inverted ? cls.inverted : cls.Icon, {}, [
        className,
      ])}
    />
  );
};

export default memo(Icon);
