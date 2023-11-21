import React, { ButtonHTMLAttributes, memo } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./Button.module.scss";

export enum ButtonTheme {
  CLEAR = "clear",
  CLEAR_INVERTED = "clearInverted",
  OUTLINE = "outline",
  OUTLINE_INVERTED = "outlineInverted",
  BACKGROUND = "background",
  BACKGROUND_INVERTED = "backgroundInverted",
}

export enum ButtonSize {
  M = "size_m",
  L = "size_l",
  XL = "size_xl",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = memo((props) => {
  const {
    className,
    children,
    theme,
    square,
    size = ButtonSize.M,
    disabled,
    ...restProps
  } = props;

  const mods: Record<string, boolean> = {
    [cls[theme]]: true,
    [cls.square]: square,
    [cls[size]]: true,
    [cls.disabled]: disabled,
  };

  return (
    <button
      className={classNames(cls.Button, mods, [className])}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  );
});

export default Button;
