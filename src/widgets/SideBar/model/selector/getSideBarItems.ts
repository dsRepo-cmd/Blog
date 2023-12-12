import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "@/entities/User";

import { SidebarItemType } from "../types/sidebar";
import MainIcon from "@/shared/assets/icons/home.svg";
import AboutIcon from "@/shared/assets/icons/document.svg";
import ProfileIcon from "@/shared/assets/icons/user.svg";
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
    {
      path: getRouteAbout(),
      Icon: AboutIcon,
      text: "About",
    },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        path: getRouteProfile(userData.id),
        Icon: ProfileIcon,
        text: "Profile",
        authOnly: true,
      },
      {
        path: getRouteArticles(),
        Icon: ArticleIcon,
        text: "Articles",
        authOnly: true,
      }
    );
  }

  return sidebarItemsList;
});
