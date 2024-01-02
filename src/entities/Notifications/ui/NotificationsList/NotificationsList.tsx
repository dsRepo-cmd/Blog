import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./NotificationsList.module.scss";
import { useNotifications } from "../../api/notificationApi";
import { VStack } from "@/shared/ui/redesigned/Stack";
import SkeletonRedesigned from "@/shared/ui/redesigned/Skeleton/Skeleton";
import NotificationItem from "../NotificationItem/NotificationItem";

interface NotificationsListProps {
  className?: string;
}

const NotificationsList: React.FC<NotificationsListProps> = ({ className }) => {
  const { data, isLoading } = useNotifications(null, {
    pollingInterval: 10000,
  });

  const Skeleton = SkeletonRedesigned;

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
};

export default memo(NotificationsList);
