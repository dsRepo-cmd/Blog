import React, { memo } from "react";
import cls from "./SideBarItem.module.scss";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import { SidebarItemType } from "../../model/types/sidebar";
import AppLink from "@/shared/ui/AppLink/AppLink";
import { Icon } from "@/shared/ui/Icon/Icon";

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
        to={item.path}
        className={classNames(cls.item, {
          [cls.collapsed]: collapsed,
        })}
        activeClassName={cls.active}
      >
        <Icon Svg={item.Icon} />
        <span className={cls.link}>{t(item.text)}</span>
      </AppLink>
    );
  }
);

export default SideBarItem;
