import { FC, HTMLAttributes, memo, ReactNode } from "react";

import cls from "./Card.module.scss";
import { classNames } from "@/shared/lib/classNames";

export type CardVariant = "normal" | "outlined" | "light";
export type CardPadding = "0" | "4" | "8" | "12" | "16" | "24";
export type CardBorder = "round" | "normal" | "partial";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  variant?: CardVariant;
  max?: boolean;
  padding?: CardPadding;
  border?: CardBorder;

  fullHeight?: boolean;
}

const mapPaddingToClass: Record<CardPadding, string> = {
  "0": "gap_0",
  "4": "gap_4",
  "8": "gap_8",
  "12": "gap_12",
  "16": "gap_16",
  "24": "gap_24",
};

const Card: FC<CardProps> = memo(
  ({
    className,
    children,
    variant = "normal",
    max,
    padding = "8",
    border = "normal",
    fullHeight,
    ...restProps
  }) => {
    const paddingClass = mapPaddingToClass[padding];

    return (
      <div
        className={classNames(
          cls.Card,
          {
            [cls.max]: max,
            [cls.fullHeight]: fullHeight,
          },
          [className, cls[variant], cls[paddingClass], cls[border]]
        )}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);
export default Card;
