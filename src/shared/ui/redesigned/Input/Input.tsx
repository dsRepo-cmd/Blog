import React, {
  FC,
  InputHTMLAttributes,
  ReactNode,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";

import cls from "./Input.module.scss";
import { Mods, classNames } from "@/shared/lib/classNames";
import { HStack } from "../Stack";
import Text from "../Text/Text";
import DeleteIcon from "../../../assets/icons/delete.svg";
import { Icon } from "../Icon/Icon";

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "readOnly" | "size"
>;

type InputSize = "s" | "m" | "l";

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  label?: string;
  onChange?: (value: string) => void;
  onDelete?: () => void;
  autofocus?: boolean;
  readonly?: boolean;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  size?: InputSize;
}

const Input: FC<InputProps> = ({
  className,
  value,
  onChange,
  type = "text",
  placeholder,
  autofocus,
  readonly,
  addonLeft,
  addonRight,
  label,
  size = "m",
  onDelete,
  ...restProps
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (autofocus) {
      setIsFocused(true);
      ref.current?.focus();
    }
  }, [autofocus]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
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

  const input = (
    <div className={classNames(cls.InputWrapper, mods, [className, cls[size]])}>
      <div className={cls.addonLeft}>{addonLeft}</div>
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChangeHandler}
        className={cls.input}
        onFocus={onFocus}
        onBlur={onBlur}
        readOnly={readonly}
        placeholder={placeholder}
        {...restProps}
      />
      <div className={cls.addonRight}>{addonRight}</div>
    </div>
  );

  if (label) {
    return (
      <HStack max gap="8">
        <Text className={cls.label} text={label} />
        {input}
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
  }

  return input;
};

export default memo(Input);
