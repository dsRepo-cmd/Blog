import React, { memo } from "react";
import cls from "./SideBarItem.module.scss";
import { useTranslation } from "react-i18next";

import { classNames } from "@/shared/lib/classNames";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import { SidebarItemType } from "../../../model/types/sidebar";
import AppLinkDeprecated, {
  AppLinkTheme,
} from "@/shared/ui/deprecated/AppLink/AppLink";
import { ToggleFeatures } from "@/shared/lib/features/ToggleFeatures/ToggleFeatures";
import AppLink from "@/shared/ui/redesigned/AppLink/AppLink";
import { Icon } from "@/shared/ui/redesigned/Icon/Icon";

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
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <AppLink
            to={item.path}
            className={classNames(cls.itemRedesigned, {
              [cls.collapsedRedesigned]: collapsed,
            })}
            activeClassName={cls.active}
          >
            <Icon Svg={item.Icon} />
            <span className={cls.link}>{t(item.text)}</span>
          </AppLink>
        }
        off={
          <AppLinkDeprecated
            theme={AppLinkTheme.SECONDARY}
            to={item.path}
            className={classNames(cls.item, {
              [cls.collapsed]: collapsed,
            })}
          >
            <item.Icon className={cls.icon} />
            <span className={cls.link}>{t(item.text)}</span>
          </AppLinkDeprecated>
        }
      />
    );
  }
);

export default SideBarItem;
