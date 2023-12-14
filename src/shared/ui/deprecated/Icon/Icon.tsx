import React, { FC, memo } from "react";

import cls from "./Icon.module.scss";
import { classNames } from "@/shared/lib/classNames";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  Svg: FC<React.SVGProps<SVGSVGElement>>;
  inverted?: boolean;
}
/**
 * Outdated, use new components from the redesigned folder
 * @deprecated
 */
export const Icon: FC<IconProps> = memo((props) => {
  const { className, Svg, inverted, ...otherProps } = props;

  return (
    <Svg
      className={classNames(inverted ? cls.inverted : cls.Icon, {}, [
        className,
      ])}
      {...otherProps}
    />
  );
});
