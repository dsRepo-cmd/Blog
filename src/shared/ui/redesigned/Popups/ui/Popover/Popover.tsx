import React, { memo, ReactNode } from "react";
import cls from "./Popover.module.scss";
import { useTranslation } from "react-i18next";
import { Popover as HPopover, Transition } from "@headlessui/react";
import { DropdownDirection } from "@/shared/types/ui";
import { mapDirectionClass } from "../../styles/consts";
import { classNames } from "@/shared/lib/classNames";
import popupCls from "../../styles/popup.module.scss";

interface PopoverProps {
  className?: string;
  direction?: DropdownDirection;
  trigger: ReactNode;
  children: ReactNode;
}

const Popover: React.FC<PopoverProps> = ({
  className,
  trigger,
  direction = "bottom left",
  children,
}) => {
  const { t } = useTranslation();
  const menuClasses = [mapDirectionClass[direction]];

  return (
    <HPopover
      className={classNames(cls.Popover, {}, [className, popupCls.popup])}
    >
      <HPopover.Button as="div" className={popupCls.trigger}>
        {trigger}
      </HPopover.Button>

      <Transition
        enter={cls.enter}
        enterFrom={cls.enterFrom}
        enterTo={cls.enterTo}
        leave={cls.leave}
        leaveFrom={cls.leaveFrom}
        leaveTo={cls.leaveTo}
      >
        <HPopover.Panel className={classNames(cls.panel, {}, menuClasses)}>
          {children}
        </HPopover.Panel>
      </Transition>
    </HPopover>
  );
};

export default memo(Popover);
