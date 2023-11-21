import React, { memo } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./Text.module.scss";
import { useTranslation } from "react-i18next";

export enum TextTheme {
  PRIMARY = "primary",
  ERROR = "error",
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
}

const Text: React.FC<TextProps> = memo(
  ({ className, title, text, theme = TextTheme.PRIMARY }: TextProps) => {
    const { t } = useTranslation();

    return (
      <div
        className={classNames(cls.Text, { [cls[theme]]: true }, [className])}
      >
        {title && <p className={cls.title}>{title}</p>}
        {text && <p className={cls.text}>{text}</p>}
      </div>
    );
  }
);

export default Text;
