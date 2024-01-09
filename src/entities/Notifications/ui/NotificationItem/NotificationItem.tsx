import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./NotificationItem.module.scss";
import { Notification } from "../../model/types/notification";
import Card from "@/shared/ui/redesigned/Card/Card";
import Text from "@/shared/ui/redesigned/Text/Text";
import { getTimeAgoString } from "@/shared/lib/features/lib/getCurrentDate";

interface NotificationItemProps {
  className?: string;
  item: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  className,
  item,
}) => {
  const content = (
    <Card className={classNames(cls.NotificationItem, {}, [className])}>
      <Text size="s" title={item.message} text={item.type} />
      <Text size="s" text={getTimeAgoString(item.date)} />
    </Card>
  );

  if (item.href) {
    return (
      <a className={cls.link} target="_blank" href={item.href} rel="noreferrer">
        {content}
      </a>
    );
  }

  return content;
};

export default memo(NotificationItem);
