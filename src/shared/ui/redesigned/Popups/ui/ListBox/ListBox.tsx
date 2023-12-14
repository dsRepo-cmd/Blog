import React, { Fragment, ReactNode } from "react";
import { Listbox as HListBox } from "@headlessui/react";

import cls from "./ListBox.module.scss";
import { classNames } from "@/shared/lib/classNames";

import popupCls from "../../styles/popup.module.scss";
import { mapDirectionClass } from "../../styles/consts";

import { DropdownDirection } from "@/shared/types/ui";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { ButtonTheme } from "@/shared/ui/deprecated/Button/Button";
import Button from "../../../Button/Button";

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps {
  items?: ListBoxItem[];
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

const ListBox: React.FC<ListBoxProps> = ({
  className,
  items,
  value,
  defaultValue,
  onChange,
  readonly = false,
  direction = "bottom right",
  label,
}) => {
  const optionsClasses = [mapDirectionClass[direction]];

  return (
    <HStack gap="4">
      {label && <span>{`${label}>`}</span>}
      <HListBox
        disabled={readonly}
        as="div"
        className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
        value={value}
        onChange={onChange}
      >
        <HListBox.Button className={cls.trigger}>
          <Button disabled={readonly}>{value ?? defaultValue}</Button>
        </HListBox.Button>
        <HListBox.Options
          className={classNames(cls.options, {}, optionsClasses)}
        >
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(cls.item, {
                    [popupCls.active]: active,
                    [popupCls.disabled]: item.disabled,
                  })}
                >
                  {selected && "!!!"}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
};

export default ListBox;
