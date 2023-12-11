import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./NotificationsList.module.scss";
import { useNotifications } from "../../api/notificationApi";
import Skeleton from "@/shared/ui/Skeleton/Skeleton";
import { VStack } from "@/shared/ui/Stack";
import NotificationsItem from "../NotificationsItem/NotificationsItem";

interface NotificationsListProps {
  className?: string;
}

const NotificationsList: React.FC<NotificationsListProps> = ({ className }) => {
  const { data, isLoading } = useNotifications(null, {
    pollingInterval: 10000,
  });

  if (isLoading) {
    return (
      <VStack
        gap="8"
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
      gap="8"
      max
      className={classNames(cls.NotificationList, {}, [className])}
    >
      {data?.map((item) => (
        <NotificationsItem key={item.id} item={item} />
      ))}
    </VStack>
  );
};

export default memo(NotificationsList);
