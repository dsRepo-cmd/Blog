import React, { memo } from "react";
import cls from "./SideBarItem.module.scss";
import { useTranslation } from "react-i18next";
import AppLink, { AppLinkTheme } from "@/shared/ui/deprecated/AppLink/AppLink";

import { classNames } from "@/shared/lib/classNames";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import { SidebarItemType } from "../../../model/types/sidebar";

interface SideBarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
  className?: string;
}

const SideBarItem: React.FC<SideBarItemProps> = memo(
  ({ item, collapsed }: SideBarItemProps) => {
    const { t } = useTranslation();
    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) {
      return null;
    }

    return (
      <AppLink
        className={classNames(cls.item, { [cls.collapsed]: collapsed }, [])}
        theme={AppLinkTheme.SECONDARY}
        to={item.path}
      >
        <item.Icon className={cls.icon} />
        <span className={cls.navLink}>{t(item.text)}</span>
      </AppLink>
    );
  }
);

export default SideBarItem;
