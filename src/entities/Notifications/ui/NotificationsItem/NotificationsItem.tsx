import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./NotificationsItem.module.scss";
import { Notification } from "../../model/types/notification";
import CardDeprecated, { CardTheme } from "@/shared/ui/deprecated/Card/Card";
import TextDeprecated from "@/shared/ui/deprecated/Text/Text";
import { ToggleFeatures } from "@/shared/lib/features/ToggleFeatures/ToggleFeatures";
import Card from "@/shared/ui/redesigned/Card/Card";
import Text from "@/shared/ui/redesigned/Text/Text";

interface NotificationsItemProps {
  className?: string;
  item: Notification;
}

const NotificationsItem: React.FC<NotificationsItemProps> = ({
  className,
  item,
}) => {
  const content = (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card className={classNames(cls.NotificationItem, {}, [className])}>
          <Text title={item.title} text={item.description} />
        </Card>
      }
      off={
        <CardDeprecated
          theme={CardTheme.OUTLINED}
          className={classNames(cls.NotificationItem, {}, [className])}
        >
          <TextDeprecated title={item.title} text={item.description} />
        </CardDeprecated>
      }
    />
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

export default memo(NotificationsItem);
