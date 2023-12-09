import { memo } from "react";
import { VStack } from "shared/ui/Stack";
import { useNotifications } from "../../api/notificationApi";
import cls from "./NotificationList.module.scss";
import Skeleton from "shared/ui/Skeleton/Skeleton";
import NotificationItem from "../NotificationItem/NotificationItem";
import { classNames } from "shared/lib/classNames";

interface NotificationListProps {
  className?: string;
}

const NotificationList: React.FC<NotificationListProps> = memo((props) => {
  const { className } = props;
  const { data, isLoading } = useNotifications(null, {
    pollingInterval: 10000,
  });

  if (isLoading) {
    return (
      <VStack
        gap="16"
        max
        className={classNames(cls.NotificationList, {}, [className])}
      >
        <Skeleton width="100%" border="8px" height="80px" />
        <Skeleton width="100%" border="8px" height="80px" />
        <Skeleton width="100%" border="8px" height="80px" />
      </VStack>
    );
  }

  return (
    <VStack
      gap="16"
      max
      className={classNames(cls.NotificationList, {}, [className])}
    >
      {data?.map((item) => (
        <NotificationItem key={item.id} item={item} />
      ))}
    </VStack>
  );
});

export default memo(NotificationList);
