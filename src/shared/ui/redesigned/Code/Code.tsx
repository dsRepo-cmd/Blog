import React, { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./Code.module.scss";
import Button, { ButtonTheme } from "../../deprecated/Button/Button";
import CopyIcon from "@/shared/assets/icons/copy.svg";
import CopyIconNew from "@/shared/assets/icons/copy-r.svg";
import { ToggleFeatures } from "@/shared/lib/features";
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
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <pre className={classNames(cls.CodeRedesigned, {}, [className])}>
          <Icon
            clickable
            onClick={onCopy}
            className={cls.copyBtn}
            Svg={CopyIconNew}
          />
          <code>{text}</code>
        </pre>
      }
      off={
        <pre className={classNames(cls.Code, {}, [className])}>
          <Button
            onClick={onCopy}
            className={cls.copyBtn}
            theme={ButtonTheme.CLEAR}
          >
            <CopyIcon className={cls.copyIcon} />
          </Button>
          <code>{text}</code>
        </pre>
      }
    />
  );
};

export default memo(Code);
