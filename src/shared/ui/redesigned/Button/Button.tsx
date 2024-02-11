import React, {
  ButtonHTMLAttributes,
  ForwardedRef,
  ReactNode,
  forwardRef,
} from "react";
import { Mods, classNames } from "@/shared/lib/classNames";
import cls from "./Button.module.scss";

export type ButtonVariant = "clear" | "outline" | "filled";

export type ButtonColor = "normal" | "icon" | "error";

export type ButtonSize = "s" | "m" | "l" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  round?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
  fullWidth?: boolean;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  color?: ButtonColor;
}

const Button: React.FC<ButtonProps> = forwardRef(
  (props, ref: ForwardedRef<HTMLButtonElement>) => {
    const {
      className,
      children,
      variant = "outline",
      round = false,
      disabled,
      fullWidth,
      size = "m",
      addonLeft,
      addonRight,
      color = "normal",
      ...restProps
    } = props;

    const mods: Mods = {
      [cls.disabled]: disabled,
      [cls.fullWidth]: fullWidth,
      [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
      [cls.round]: round,
    };

    return (
      <button
        type="button"
        className={classNames(cls.Button, mods, [
          className,
          cls[variant],
          cls[size],
          cls[color],
        ])}
        disabled={disabled}
        ref={ref}
        {...restProps}
      >
        <div className={cls.addonLeft}>{addonLeft}</div>
        {children}
        <div className={cls.addonRight}>{addonRight}</div>
      </button>
    );
  }
);

export default Button;
