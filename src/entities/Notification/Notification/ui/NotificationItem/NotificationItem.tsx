import { memo } from "react";
import Card, { CardTheme } from "shared/ui/Card/Card";

import cls from "./NotificationItem.module.scss";
import { Notification } from "../../model/types/notification";
import { classNames } from "shared/lib/classNames";
import Text from "shared/ui/Text/Text";

interface NotificationItemProps {
  className?: string;
  item: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = memo(
  (props: NotificationItemProps) => {
    const { className, item } = props;

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
          className={cls.link}
          target="_blank"
          href={item.href}
          rel="noreferrer"
        >
          {content}
        </a>
      );
    }

    return content;
  }
);

export default memo(NotificationItem);
