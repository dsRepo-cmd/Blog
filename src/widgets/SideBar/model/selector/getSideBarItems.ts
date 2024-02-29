import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "@/entities/User";
import { SidebarItemType } from "../types/sidebar";
import MainIcon from "@/shared/assets/icons/home.svg";
import AboutIcon from "@/shared/assets/icons/Info.svg";
import ProfileIcon from "@/shared/assets/icons/avatar.svg";
import ArticleIcon from "@/shared/assets/icons/article.svg";

import {
  getRouteAbout,
  getRouteArticles,
  getRouteMain,
  getRouteProfile,
} from "@/shared/const/router";

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: getRouteMain(),
      Icon: MainIcon,
      text: "Main",
    },
    ...(userData
      ? [
          {
            path: getRouteProfile(userData.id),
            Icon: ProfileIcon,
            text: "Profile",
            authOnly: true,
          },
        ]
      : []),

    {
      path: getRouteArticles(),
      Icon: ArticleIcon,
      text: "Articles",
    },

    {
      path: getRouteAbout(),
      Icon: AboutIcon,
      text: "About",
    },
  ];

  return sidebarItemsList;
});
