import { rtkApi } from "@/shared/api/rtkApi";
import { Notification } from "../model/types/notification";

interface SetNotificationArg {
  userId: string;
}

const notificationApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<Notification[], SetNotificationArg>({
      query: ({ userId }) => ({
        url: `/notifications/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const useNotifications = notificationApi.useGetNotificationsQuery;
