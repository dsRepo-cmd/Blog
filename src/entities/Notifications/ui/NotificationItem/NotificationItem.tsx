import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./NotificationItem.module.scss";
import { Notification } from "../../model/types/notification";
import Card from "@/shared/ui/Card/Card";
import Text from "@/shared/ui/Text/Text";
import { getTimeAgoString } from "@/shared/lib/features/lib/getCurrentDate";
import { Link } from "react-router-dom";

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
      <Link
        className={cls.link}
        target="_blank"
        to={item.href}
        rel="noreferrer"
      >
        {content}
      </Link>
    );
  }

  return content;
};

export default memo(NotificationItem);
