import React, { memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./Code.module.scss";
import Button, { ButtonTheme } from "../Button/Button";
import CopyIcon from "shared/assets/icons/copy.svg";
import Icon from "../Icon/Icon";

interface CodeProps {
  className?: string;
  text: string;
}

const Code: React.FC<CodeProps> = ({ className, text }) => {
  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <pre className={classNames(cls.Code, {}, [className])}>
      <Button
        onClick={onCopy}
        className={cls.copyBtn}
        theme={ButtonTheme.CLEAR}
      >
        <Icon Svg={CopyIcon} className={cls.copyIcon} />
      </Button>
      <code className={cls.text}>{text}</code>
    </pre>
  );
};

export default memo(Code);
