import React, { FC, memo } from "react";

import cls from "./Icon.module.scss";
import { classNames } from "@/shared/lib/classNames";
import { title } from "process";

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, "onClick">;

interface IconBaseProps extends SvgProps {
  className?: string;
  positioned?: boolean;
  Svg: FC<React.SVGProps<SVGSVGElement>>;
  title?: string;
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
    ...otherProps
  } = props;

  const icon = (
    <Svg
      className={classNames(cls.Icon, {}, [positioned ? "" : className])}
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
        className={classNames(cls.button, {}, [className])}
        onClick={props.onClick}
        style={{ height, width }}
      >
        {icon}
      </button>
    );
  }

  return icon;
});
