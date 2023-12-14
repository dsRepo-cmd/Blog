import React, { memo, useCallback, useState } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./NotificationButton.module.scss";
import NotificationIconDeprecated from "@/shared/assets/icons/bell.svg";
import { Icon as IconDeprecated } from "@/shared/ui/deprecated/Icon/Icon";

import ButtonDeprecated, {
  ButtonTheme,
} from "@/shared/ui/deprecated/Button/Button";
import { Popover as PopoverDeprecated } from "@/shared/ui/deprecated/Popups";
import { NotificationsList } from "@/entities/Notifications";
import { BrowserView, MobileView } from "react-device-detect";
import NotificationIcon from "@/shared/assets/icons/notification.svg";
import { Drawer } from "@/shared/ui/deprecated/Drawer/Drawer";
import { ToggleFeatures } from "@/shared/lib/features/ToggleFeatures/ToggleFeatures";
import { Icon } from "@/shared/ui/redesigned/Icon/Icon";
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
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />}
      off={
        <ButtonDeprecated onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
          <IconDeprecated Svg={NotificationIconDeprecated} inverted />
        </ButtonDeprecated>
      }
    />
  );

  return (
    <div>
      <BrowserView>
        <ToggleFeatures
          feature="isAppRedesigned"
          on={
            <Popover
              className={classNames(cls.NotificationButton, {}, [className])}
              direction="bottom left"
              trigger={trigger}
            >
              <NotificationsList className={cls.notifications} />
            </Popover>
          }
          off={
            <PopoverDeprecated
              className={classNames(cls.NotificationButton, {}, [className])}
              direction="bottom left"
              trigger={trigger}
            >
              <NotificationsList className={cls.notifications} />
            </PopoverDeprecated>
          }
        />
      </BrowserView>
      <MobileView>
        {trigger}
        <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
          <NotificationsList />
        </Drawer>
      </MobileView>
    </div>
  );
};

export default memo(NotificationButton);
