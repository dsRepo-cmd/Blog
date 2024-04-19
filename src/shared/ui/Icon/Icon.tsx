import React, { FC, memo } from "react";

import cls from "./Icon.module.scss";
import { Mods, classNames } from "@/shared/lib/classNames";

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, "onClick">;

type VariantType = "error" | "normal";
interface IconBaseProps extends SvgProps {
  className?: string;
  positioned?: boolean;
  Svg: FC<React.SVGProps<SVGSVGElement>>;
  title?: string;
  variant?: VariantType;
  filled?: boolean;
}

interface NonClickableIconProps extends IconBaseProps {
  clickable?: false;
}

interface ClickableBaseProps extends IconBaseProps {
  clickable: true;
  onClick: () => void;
}

type IconProps = NonClickableIconProps | ClickableBaseProps;

export const Icon: FC<IconProps> = memo((props) => {
  const {
    className,
    Svg,
    width = 32,
    height = 32,
    clickable,
    positioned,
    title,
    filled = false,
    variant = "normal",
    ...otherProps
  } = props;

  const mods: Mods = {
    [cls.filled]: filled,
  };
  const icon = (
    <Svg
      className={classNames(cls.Icon, mods, [
        positioned ? "" : className,
        cls[variant],
      ])}
      width={width}
      height={height}
      {...otherProps}
      onClick={undefined}
    />
  );

  if (clickable) {
    return (
      <button
        title={title}
        type="button"
        className={classNames(cls.button, {}, [className, cls[variant]])}
        onClick={props.onClick}
        style={{ height, width }}
      >
        {icon}
      </button>
    );
  }

  return icon;
});
