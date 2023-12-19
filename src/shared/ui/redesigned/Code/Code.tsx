import React, { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./Code.module.scss";
import CopyIconNew from "@/shared/assets/icons/copy-r.svg";
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
        clickable
        onClick={onCopy}
        className={cls.copyBtn}
        Svg={CopyIconNew}
      />
      <code>{text}</code>
    </pre>
  );
};

export default memo(Code);
