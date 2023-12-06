import React, { HTMLAttributes, memo, ReactNode } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./Card.module.scss";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ className, children, ...restProps }) => {
  return (
    <div className={classNames(cls.Card, {}, [className])} {...restProps}>
      {children}
    </div>
  );
};

export default memo(Card);
