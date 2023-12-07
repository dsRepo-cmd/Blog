import React, { HTMLAttributes, memo, ReactNode } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./Card.module.scss";

export enum CardTheme {
  DEFAULT = "default",
  NORMAL = "normal",
  OUTLINED = "outlined",
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  theme?: CardTheme;
}

const Card: React.FC<CardProps> = ({
  className,
  children,
  theme = CardTheme.DEFAULT,
  ...restProps
}) => {
  return (
    <div
      className={classNames(cls.Card, {}, [className, cls[theme]])}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default memo(Card);
