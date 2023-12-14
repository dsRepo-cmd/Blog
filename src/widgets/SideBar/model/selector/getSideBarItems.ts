import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "@/entities/User";

import { SidebarItemType } from "../types/sidebar";
import MainIconDeprecated from "@/shared/assets/icons/home-d.svg";
import AboutIconDeprecated from "@/shared/assets/icons/document.svg";
import ProfileIconDeprecated from "@/shared/assets/icons/user.svg";
import ArticleIconDeprecated from "@/shared/assets/icons/article-d.svg";

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
import { toggleFeatures } from "@/shared/lib/features/toggleFeatures";

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: getRouteMain(),
      Icon: toggleFeatures({
        name: "isAppRedesigned",
        off: () => MainIconDeprecated,
        on: () => MainIcon,
      }),
      text: "Main",
    },
    {
      path: getRouteAbout(),
      Icon: toggleFeatures({
        name: "isAppRedesigned",
        off: () => AboutIconDeprecated,
        on: () => AboutIcon,
      }),
      text: "About",
    },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        path: getRouteProfile(userData.id),
        Icon: toggleFeatures({
          name: "isAppRedesigned",
          off: () => ProfileIconDeprecated,
          on: () => ProfileIcon,
        }),
        text: "Profile",
        authOnly: true,
      },
      {
        path: getRouteArticles(),
        Icon: toggleFeatures({
          name: "isAppRedesigned",
          off: () => ArticleIconDeprecated,
          on: () => ArticleIcon,
        }),
        text: "Articles",
        authOnly: true,
      }
    );
  }

  return sidebarItemsList;
});
