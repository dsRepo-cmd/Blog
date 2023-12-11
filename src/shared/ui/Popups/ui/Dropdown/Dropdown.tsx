import React, { ReactNode, memo, Fragment } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./Dropdown.module.scss";
import { DropdownDirection } from "../../../../types/ui";
import { Menu } from "@headlessui/react";
import AppLink from "../../../AppLink/AppLink";
import popupCls from "../../styles/popup.module.scss";
import { mapDirectionClass } from "../../styles/consts";

export interface DropdownItem {
  disabled?: boolean;
  content?: ReactNode;
  onClick?: () => void;
  href?: string;
}

interface DropdownProps {
  className?: string;
  items: DropdownItem[];
  direction: DropdownDirection;
  trigger: ReactNode;
}

interface DropdownProps {
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  className,
  items,
  direction,
  trigger,
}) => {
  const menuClasses = [mapDirectionClass[direction]];

  return (
    <Menu
      as="div"
      className={classNames(cls.Dropdown, {}, [className, popupCls.popup])}
    >
      <Menu.Button className={popupCls.btn}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
        {items.map((item, index) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              type="button"
              disabled={item.disabled}
              onClick={item.onClick}
              className={classNames(cls.item, { [popupCls.active]: active })}
            >
              {item.content}
            </button>
          );

          if (item.href) {
            return (
              <Menu.Item
                key={`dropdown-key-${index}`}
                as={AppLink}
                to={item.href}
                disabled={item.disabled}
              >
                {content}
              </Menu.Item>
            );
          }

          return (
            <Menu.Item
              key={`dropdown-key-${index}`}
              as={Fragment}
              disabled={item.disabled}
            >
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default memo(Dropdown);
