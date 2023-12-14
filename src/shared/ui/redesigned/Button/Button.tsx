import React, { ButtonHTMLAttributes, ReactNode, memo } from "react";
import { Mods, classNames } from "@/shared/lib/classNames";
import cls from "./Button.module.scss";

export type ButtonVariant = "clear" | "outline";

export type ButtonSize = "m" | "l" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = memo((props) => {
  const {
    className,
    children,
    variant = "outline",
    square,
    disabled,
    fullWidth,
    size = "m",
    ...restProps
  } = props;

  const mods: Mods = {
    [cls.square]: square,
    [cls.disabled]: disabled,
    [cls.fullWidth]: fullWidth,
  };

  return (
    <button
      type="button"
      className={classNames(cls.Button, mods, [
        className,
        cls[variant],
        cls[size],
      ])}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  );
});

export default Button;
