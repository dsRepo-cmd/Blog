import React, { memo } from "react";
import cls from "./SideBarItem.module.scss";
import { useTranslation } from "react-i18next";
import AppLink, { AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { SideBarItemType } from "widgets/SideBar/model/items";
import { classNames } from "shared/lib/classNames";

interface SideBarItemProps {
  item: SideBarItemType;
  collapsed: boolean;
  className?: string;
}

const SideBarItem: React.FC<SideBarItemProps> = memo(
  ({ item, collapsed }: SideBarItemProps) => {
    const { t } = useTranslation();

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
