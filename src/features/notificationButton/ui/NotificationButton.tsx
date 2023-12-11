import React, { memo } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./NotificationButton.module.scss";
import { useTranslation } from "react-i18next";
import NotificationIcon from "shared/assets/icons/bell.svg";
import Icon from "shared/ui/Icon/Icon";

import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { Popover } from "shared/ui/Popups";
import { NotificationsList } from "entities/Notifications";

interface NotificationButtonProps {
  className?: string;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({
  className,
}) => {
  const { t } = useTranslation();

  return (
    <Popover
      trigger={
        <Button theme={ButtonTheme.CLEAR}>
          <Icon inverted width={24} height={24} Svg={NotificationIcon} />
        </Button>
      }
    >
      <NotificationsList />
    </Popover>
  );
};

export default memo(NotificationButton);
