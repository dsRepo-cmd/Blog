import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import cls from "./Flex.module.scss";
import { Mods, classNames } from "@/shared/lib/classNames";

export type FlexJustify = "start" | "center" | "end" | "between";
export type FlexAlign = "start" | "center" | "end" | "stretch";
export type FlexDirection = "row" | "column";
export type FlexGap = "4" | "8" | "12" | "16" | "24" | "32";
export type FlexWrap = "nowrap" | "wrap";
export type FlexPadding = "0" | "8" | "12" | "16" | "24";

const mapPaddingToClass: Record<FlexPadding, string> = {
  "0": "padding_0",
  "8": "padding_8",
  "12": "padding_12",
  "16": "padding_16",
  "24": "padding_24",
};

const justifyClasses: Record<FlexJustify, string> = {
  start: cls.justifyStart,
  center: cls.justifyCenter,
  end: cls.justifyEnd,
  between: cls.justifyBetween,
};

const alignClasses: Record<FlexAlign, string> = {
  start: cls.alignStart,
  center: cls.alignCenter,
  end: cls.alignEnd,
  stretch: cls.alignStretch,
};

const directionClasses: Record<FlexDirection, string> = {
  row: cls.directionRow,
  column: cls.directionColumn,
};

const gapClasses: Record<FlexGap, string> = {
  4: cls.gap4,
  8: cls.gap8,
  12: cls.gap12,
  16: cls.gap16,
  24: cls.gap24,
  32: cls.gap32,
};

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface FlexProps extends DivProps {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction: FlexDirection;
  gap?: FlexGap;
  max?: boolean;
  wrap?: FlexWrap;
  maxHeight?: boolean;
  padding?: FlexPadding;
}

export const Flex = (props: FlexProps) => {
  const {
    className,
    children,
    justify = "start",
    align = "center",
    direction = "row",
    wrap = "nowrap",
    padding = "0",
    gap,
    max,
    maxHeight,
  } = props;

  const paddingClass = mapPaddingToClass[padding];

  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    gap && gapClasses[gap],
    cls[wrap],
    cls[paddingClass],
  ];

  const mods: Mods = {
    [cls.max]: max,
    [cls.maxHeight]: maxHeight,
  };

  return <div className={classNames(cls.Flex, mods, classes)}>{children}</div>;
};
