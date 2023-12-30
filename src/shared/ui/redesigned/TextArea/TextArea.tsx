import React, {
  FC,
  ReactNode,
  TextareaHTMLAttributes,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";

import cls from "./TextArea.module.scss";
import { Mods, classNames } from "@/shared/lib/classNames";
import { HStack } from "../Stack";
import Text from "../Text/Text";
import { Icon } from "../Icon/Icon";
import DeleteIcon from "../../../assets/icons/delete.svg";

type HTMLInputProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "value" | "onChange" | "readOnly" | "size"
>;

interface TextAreaProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  label?: string;
  onChange?: (value: string) => void;
  autofocus?: boolean;
  readonly?: boolean;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  onDelete?: () => void;
  rows?: number;
  cols?: number;
}

const TextArea: FC<TextAreaProps> = ({
  className,
  value,
  onChange,
  placeholder,
  autofocus,
  readonly,
  addonLeft,
  addonRight,
  label,
  onDelete,
  ...restProps
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState<number | null>();

  useEffect(() => {
    if (autofocus) {
      setIsFocused(true);
      ref.current?.focus();
    }
    if (ref.current) {
      setTextareaHeight(ref.current.scrollHeight);
    }
  }, [autofocus, ref]);

  const autoResizeTextarea = () => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
      setTextareaHeight(ref.current.scrollHeight);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
    autoResizeTextarea();
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const mods: Mods = {
    [cls.readonly]: readonly,
    [cls.focused]: isFocused,
    [cls.withAddonLeft]: Boolean(addonLeft),
    [cls.withAddonRight]: Boolean(addonRight),
  };

  const textArea = (
    <HStack max gap={"12"}>
      <HStack
        max
        className={classNames(cls.TextAreaWrapper, mods, [className])}
      >
        <div className={cls.addonLeft}>{addonLeft}</div>
        <textarea
          style={{ height: textareaHeight ? `${textareaHeight}px` : "auto" }}
          ref={ref}
          value={value}
          onChange={onChangeHandler}
          className={cls.textarea}
          onFocus={onFocus}
          onBlur={onBlur}
          readOnly={readonly}
          placeholder={placeholder}
          {...restProps}
        />
        <div className={cls.addonRight}>{addonRight}</div>
      </HStack>
      {onDelete && (
        <Icon
          className={cls.removeIcon}
          onClick={onDelete}
          clickable
          Svg={DeleteIcon}
          width={20}
          height={20}
        />
      )}
    </HStack>
  );

  if (label) {
    return (
      <HStack max gap="8">
        <Text className={cls.label} text={label} />
        {textArea}
      </HStack>
    );
  }

  return textArea;
};

export default memo(TextArea);
