import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";

import { useNotifications } from "../../api/notificationApi";
import { VStack } from "@/shared/ui/redesigned/Stack";
import Skeleton from "@/shared/ui/Skeleton/Skeleton";
import NotificationItem from "../NotificationItem/NotificationItem";
import { USER_LOCAL_STORAGE_KEY } from "@/shared/const/localStorage";

interface NotificationsListProps {
  className?: string;
}

const NotificationsList: React.FC<NotificationsListProps> = ({ className }) => {
  const userId = localStorage.getItem(USER_LOCAL_STORAGE_KEY) || "";
  console.log("userId", userId);

  const { data, isLoading } = useNotifications(
    { userId },
    {
      pollingInterval: 10000,
    }
  );

  if (data) console.log(data);

  if (isLoading) {
    return (
      <VStack gap="16" max className={classNames("", {}, [className])}>
        <Skeleton width="100%" border="8px" height="80px" />
        <Skeleton width="100%" border="8px" height="80px" />
        <Skeleton width="100%" border="8px" height="80px" />
      </VStack>
    );
  }

  return (
    <VStack gap="16" max className={classNames("", {}, [className])}>
      {data?.map((item) => (
        <NotificationItem key={item.id} item={item} />
      ))}
    </VStack>
  );
};

export default memo(NotificationsList);
