import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./NotificationsItem.module.scss";
import { Notification } from "../../model/types/notification";
import Card, { CardTheme } from "@/shared/ui/Card/Card";
import Text from "@/shared/ui/Text/Text";

interface NotificationsItemProps {
  className?: string;
  item: Notification;
}

const NotificationsItem: React.FC<NotificationsItemProps> = ({
  className,
  item,
}) => {
  const content = (
    <Card
      theme={CardTheme.OUTLINED}
      className={classNames(cls.NotificationItem, {}, [className])}
    >
      <Text title={item.title} text={item.description} />
    </Card>
  );

  if (item.href) {
    return (
      <a
        className={classNames(cls.NotificationItem, {}, [className])}
        target="_blank"
        href={item.href}
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return content;
};

export default memo(NotificationsItem);
