import { RouteProps } from "react-router-dom";
import { AboutPage } from "@/pages/AboutPage";
import { MainPage } from "@/pages/MainPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { ArticlesPage } from "@/pages/ArticlesPage";
import { ArticleDetailsPage } from "@/pages/ArticleDetailsPage";
import { ArticleEditPage } from "@/pages/ArticleEditPage";
import { AdminPanelPage } from "@/pages/AdminPanelPage";

import { ForbiddenPage } from "@/pages/ForbiddenPage";
import { UserRole } from "@/entities/User";

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRole[];
};

export enum AppRoutes {
  MAIN = "main",
  ABOUT = "about",
  PROFILE = "profile",
  ARTICLES = "articles",
  ARTICLE_DETAILS = "article_details",
  ARTICLE_CREATE = "article_create",
  ARTICLE_EDIT = "article_edit",
  AADMIN_PANEL = "admin_panel",
  FORBIDDEN = "forbidden",

  NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.ABOUT]: "/about",
  [AppRoutes.ARTICLES]: "/articles",
  [AppRoutes.PROFILE]: "/profile/", //+ :id
  [AppRoutes.ARTICLE_DETAILS]: "/article/", //+ :id
  [AppRoutes.ARTICLE_CREATE]: "/article/new",
  [AppRoutes.ARTICLE_EDIT]: "/article/:id/edit",
  [AppRoutes.AADMIN_PANEL]: "/admin",
  [AppRoutes.FORBIDDEN]: "/forbidden",

  [AppRoutes.NOT_FOUND]: "*",
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: { path: RoutePath.main, element: <MainPage /> },
  [AppRoutes.ABOUT]: { path: RoutePath.about, element: <AboutPage /> },
  [AppRoutes.PROFILE]: {
    authOnly: true,
    path: RoutePath.profile + ":id",
    element: <ProfilePage />,
  },

  [AppRoutes.ARTICLES]: {
    authOnly: true,
    path: RoutePath.articles,
    element: <ArticlesPage />,
  },

  [AppRoutes.ARTICLE_DETAILS]: {
    path: RoutePath.article_details + ":id",
    element: <ArticleDetailsPage />,
    authOnly: true,
  },

  [AppRoutes.ARTICLE_CREATE]: {
    path: RoutePath.article_create,
    element: <ArticleEditPage />,
    authOnly: true,
  },

  [AppRoutes.ARTICLE_EDIT]: {
    path: RoutePath.article_edit,
    element: <ArticleEditPage />,
    authOnly: true,
  },

  [AppRoutes.AADMIN_PANEL]: {
    path: RoutePath.admin_panel,
    element: <AdminPanelPage />,
    authOnly: true,
    roles: [UserRole.MANAGER, UserRole.ADMIN],
  },

  [AppRoutes.FORBIDDEN]: {
    path: RoutePath.forbidden,
    element: <ForbiddenPage />,
    authOnly: true,
  },

  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
