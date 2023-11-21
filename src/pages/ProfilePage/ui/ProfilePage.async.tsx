import { lazy } from "react";

export const ProfilePageAsync = lazy(
  () =>
    new Promise<{ default: React.ComponentType<any> }>((resolve) => {
      setTimeout(() => resolve(import("./ProfilePage")), 1500);
    })
);
