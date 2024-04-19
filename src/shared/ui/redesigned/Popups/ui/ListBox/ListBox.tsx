import { Fragment, ReactNode, useMemo } from "react";
import { Listbox as HListBox, Transition } from "@headlessui/react";

import { DropdownDirection } from "@/shared/types/ui";
import { HStack } from "../../../../redesigned/Stack";
import ArrowIcon from "@/shared/assets/icons/arrow-bottom.svg";
import cls from "./ListBox.module.scss";
import { mapDirectionClass } from "../../styles/consts";
import popupCls from "../../styles/popup.module.scss";
import { classNames } from "@/shared/lib/classNames";
import Button from "../../../../Button/Button";
import { Icon } from "../../../../Icon/Icon";

export interface ListBoxItem<T extends string> {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps<T extends string> {
  items?: ListBoxItem<T>[];
  className?: string;
  value?: T;
  defaultValue?: string;
  onChange: (value: T) => void;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

function ListBox<T extends string>({
  className,
  items,
  value,
  defaultValue,
  onChange,
  readonly,
  direction = "bottom right",
  label,
}: ListBoxProps<T>) {
  const optionsClasses = [
    className,
    mapDirectionClass[direction],
    popupCls.menu,
  ];

  const selectedItem = useMemo(() => {
    return items?.find((item) => item.value === value);
  }, [items, value]);

  return (
    <HStack gap="24">
      {label && <span>{label}</span>}
      <HListBox
        disabled={readonly}
        as="div"
        className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
        value={value}
        onChange={onChange}
      >
        <HListBox.Button as="div" className={cls.trigger}>
          <Button
            size="s"
            disabled={readonly}
            addonRight={<Icon Svg={ArrowIcon} />}
          >
            {selectedItem?.content ?? defaultValue}
          </Button>
        </HListBox.Button>

        <Transition
          className={classNames(cls.options, {}, optionsClasses)}
          enter={cls.enter}
          enterFrom={cls.enterFrom}
          enterTo={cls.enterTo}
          leave={cls.leave}
          leaveFrom={cls.leaveFrom}
          leaveTo={cls.leaveTo}
        >
          <HListBox.Options>
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
                      [popupCls.selected]: selected,
                    })}
                  >
                    {selected}
                    {item.content}
                  </li>
                )}
              </HListBox.Option>
            ))}
          </HListBox.Options>
        </Transition>
      </HListBox>
    </HStack>
  );
}

export default ListBox;
