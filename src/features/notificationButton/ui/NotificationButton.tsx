import React, { memo, useCallback, useState } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./NotificationButton.module.scss";
import { useTranslation } from "react-i18next";
import NotificationIcon from "shared/assets/icons/bell.svg";
import Icon from "shared/ui/Icon/Icon";

import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { Popover } from "shared/ui/Popups";
import { NotificationsList } from "entities/Notifications";
import { BrowserView, MobileView } from "react-device-detect";
import Drawer from "shared/ui/Drawer/Drawer";

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
    <Button onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
      <Icon Svg={NotificationIcon} inverted />
    </Button>
  );

  return (
    <>
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
        <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
          <NotificationsList />
        </Drawer>
      </MobileView>
    </>
  );
};

export default memo(NotificationButton);
