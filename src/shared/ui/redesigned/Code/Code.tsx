import React, { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./Code.module.scss";
import CopyIconNew from "@/shared/assets/icons/copy.svg";
import { Icon } from "../Icon/Icon";

interface CodeProps {
  className?: string;
  text: string;
}

const Code: React.FC<CodeProps> = ({ className, text }) => {
  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <pre className={classNames(cls.CodeRedesigned, {}, [className])}>
      <Icon
        width={20}
        clickable
        onClick={onCopy}
        className={classNames(cls.copyBtn, {}, [className])}
        Svg={CopyIconNew}
      />
      <code className={classNames(cls.code, {}, [className])}>{text}</code>
    </pre>
  );
};

export default memo(Code);
