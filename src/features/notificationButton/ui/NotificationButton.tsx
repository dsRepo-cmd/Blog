import React, { memo, useCallback, useState } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./NotificationButton.module.scss";
import { NotificationsList } from "@/entities/Notifications";
import { BrowserView, MobileView } from "react-device-detect";
import NotificationIcon from "@/shared/assets/icons/notification.svg";
import { Drawer } from "@/shared/ui/Drawer/Drawer";
import { Icon } from "@/shared/ui/Icon/Icon";
import { Popover } from "@/shared/ui/redesigned/Popups";

interface NotificationButtonProps {
  className?: string;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const trigger = (
    <Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />
  );

  return (
    <div>
      <BrowserView>
        <Popover
          className={classNames(cls.NotificationButton, {}, [className])}
          direction="bottom left"
          trigger={trigger}
        >
          <NotificationsList className={cls.notifications} />
        </Popover>
      </BrowserView>
      <MobileView>
        {trigger}
        <Drawer padding isOpen={isOpen} onClose={onCloseDrawer}>
          <NotificationsList />
        </Drawer>
      </MobileView>
    </div>
  );
};

export default memo(NotificationButton);
