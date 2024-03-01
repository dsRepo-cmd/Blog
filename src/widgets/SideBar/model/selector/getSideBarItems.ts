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
      id: 1,
    },
    ...(userData
      ? [
          {
            path: getRouteProfile(userData.id),
            Icon: ProfileIcon,
            text: "Profile",
            authOnly: true,
            id: 2,
          },
        ]
      : []),

    {
      path: getRouteArticles(),
      Icon: ArticleIcon,
      text: "Articles",
      id: 3,
    },

    {
      path: getRouteAbout(),
      Icon: AboutIcon,
      text: "About",
      id: 4,
    },
  ];

  return sidebarItemsList;
});
