import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "@/entities/User";

import { SidebarItemType } from "../types/sidebar";
import MainIcon from "@/shared/assets/icons/home.svg";
import AboutIcon from "@/shared/assets/icons/document.svg";
import ProfileIcon from "@/shared/assets/icons/user.svg";
import ArticleIcon from "@/shared/assets/icons/article.svg";
import { RoutePath } from "@/shared/const/router";

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: RoutePath.main,
      Icon: MainIcon,
      text: "Main",
    },
    {
      path: RoutePath.about,
      Icon: AboutIcon,
      text: "About",
    },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        path: RoutePath.profile + userData.id,
        Icon: ProfileIcon,
        text: "Profile",
        authOnly: true,
      },
      {
        path: RoutePath.articles,
        Icon: ArticleIcon,
        text: "Articles",
        authOnly: true,
      }
    );
  }

  return sidebarItemsList;
});
