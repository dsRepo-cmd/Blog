import React, { memo, FC } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./Icon.module.scss";

interface IconProps {
  className?: string;
  Svg: FC<React.SVGProps<SVGSVGElement>>;
}

const Icon: React.FC<IconProps> = ({ className, Svg }) => {
  return <Svg className={classNames(cls.Icon, {}, [className])} />;
};

export default memo(Icon);
