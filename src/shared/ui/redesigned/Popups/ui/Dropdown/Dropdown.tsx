import { Menu, Transition } from "@headlessui/react";
import { Fragment, ReactNode, memo, forwardRef, FC } from "react";

import { DropdownDirection } from "@/shared/types/ui";

import cls from "./Dropdown.module.scss";
import { mapDirectionClass } from "../../styles/consts";
import popupCls from "../../styles/popup.module.scss";
import { classNames } from "@/shared/lib/classNames";
import AppLink, { AppLinkProps } from "../../../AppLink/AppLink";
import { Icon } from "../../../Icon/Icon";
import { HStack } from "../../../Stack";

export interface DropdownItem {
  disabled?: boolean;
  content?: ReactNode;
  onClick?: () => void;
  href?: string;
  id: string;
  svg?: FC<React.SVGProps<SVGSVGElement>>;
}

interface DropdownProps {
  className?: string;
  items: DropdownItem[];
  direction?: DropdownDirection;
  trigger: ReactNode;
}

const AppLinkWithRef = forwardRef<HTMLAnchorElement, AppLinkProps>(
  (props, ref) => <AppLink {...props} forwardedRef={ref} />
);

const Dropdown: React.FC<DropdownProps> = ({
  className,
  trigger,
  items,
  direction = "bottom right",
}) => {
  const menuClasses = [mapDirectionClass[direction], popupCls.menu];

  return (
    <Menu
      as="div"
      className={classNames(cls.Dropdown, {}, [className, popupCls.popup])}
    >
      <Menu.Button className={popupCls.trigger}>{trigger}</Menu.Button>
      <Transition
        enter={cls.enter}
        enterFrom={cls.enterFrom}
        enterTo={cls.enterTo}
        leave={cls.leave}
        leaveFrom={cls.leaveFrom}
        leaveTo={cls.leaveTo}
      >
        <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
          {items.map((item) => {
            const content = ({ active }: { active: boolean }) => (
              <button
                type="button"
                disabled={item.disabled}
                onClick={item.onClick}
                className={classNames(cls.item, {
                  [popupCls.active]: active,
                })}
              >
                <HStack gap="12" align="center">
                  {item.svg && <Icon Svg={item.svg} width={20} />}
                  {item.content}
                </HStack>
              </button>
            );

            if (item.href) {
              return (
                <Menu.Item
                  as={AppLinkWithRef}
                  to={item.href}
                  disabled={item.disabled}
                  key={item.id}
                >
                  {content}
                </Menu.Item>
              );
            }

            return (
              <Menu.Item key={item.id} as={Fragment} disabled={item.disabled}>
                {content}
              </Menu.Item>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default memo(Dropdown);
