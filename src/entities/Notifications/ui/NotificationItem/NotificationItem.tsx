import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./NotificationItem.module.scss";
import { Notification } from "../../model/types/notification";
import CardDeprecated, { CardTheme } from "@/shared/ui/deprecated/Card/Card";
import TextDeprecated from "@/shared/ui/deprecated/Text/Text";
import { ToggleFeatures } from "@/shared/lib/features/ui/ToggleFeatures/ToggleFeatures";
import Card from "@/shared/ui/redesigned/Card/Card";
import Text from "@/shared/ui/redesigned/Text/Text";

interface NotificationItemProps {
  className?: string;
  item: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
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

export default memo(NotificationItem);
