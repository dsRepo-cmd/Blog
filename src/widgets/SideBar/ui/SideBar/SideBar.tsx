import React, { useMemo, useState } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./SideBar.module.scss";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";

import Button, {
  ButtonSize,
  ButtonTheme,
} from "@/shared/ui/deprecated/Button/Button";

import ArrowLeft from "@/shared/assets/icons/angle-left.svg";
import ArrowRight from "@/shared/assets/icons/angle-right.svg";

import SideBarItem from "./SideBarItem/SideBarItem";
import { useSelector } from "react-redux";
import { getSidebarItems } from "../../model/selector/getSideBarItems";
import { VStack } from "@/shared/ui/redesigned/Stack";
import LangSwitcher from "../../../../features/LangSwitcher/LangSwitcher";
import { ToggleFeatures } from "@/shared/lib/features/ui/ToggleFeatures/ToggleFeatures";
import AppLogo from "@/shared/ui/redesigned/AppLogo/AppLogo";
import { Icon } from "@/shared/ui/redesigned/Icon/Icon";
import ArrowIcon from "@/shared/assets/icons/arrow-bottom.svg";

interface SideBarProps {
  className?: string;
}

const SideBar: React.FC<SideBarProps> = ({ className }: SideBarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const sideBarItemList = useSelector(getSidebarItems);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(() => {
    return sideBarItemList.map((item) => (
      <SideBarItem collapsed={collapsed} item={item} key={item.path} />
    ));
  }, [collapsed, sideBarItemList]);

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <aside
          data-testid="sidebar"
          className={classNames(
            cls.SidebarRedesigned,
            { [cls.collapsedRedesigned]: collapsed },
            [className]
          )}
        >
          <AppLogo size={collapsed ? 30 : 50} className={cls.appLogo} />
          <VStack role="navigation" gap="8" className={cls.items}>
            {itemsList}
          </VStack>
          <Icon
            data-testid="sidebar-toggle"
            onClick={onToggle}
            className={cls.collapseBtn}
            Svg={ArrowIcon}
            clickable
          />
          <div className={cls.switchers}>
            <ThemeSwitcher />
            <LangSwitcher short={collapsed} className={cls.lang} />
          </div>
        </aside>
      }
      off={
        <aside
          className={classNames(cls.SideBar, { [cls.collapsed]: collapsed }, [
            className,
          ])}
        >
          <Button
            theme={ButtonTheme.BACKGROUND}
            className={cls.collapsedBtn}
            onClick={onToggle}
            square
            size={ButtonSize.L}
          >
            {collapsed ? <ArrowRight /> : <ArrowLeft />}
          </Button>

          <VStack
            role="navigation"
            align="start"
            gap="12"
            className={cls.items}
          >
            {itemsList}
          </VStack>

          <div className={cls.switchers}>
            <LangSwitcher />
            <ThemeSwitcher />
          </div>
        </aside>
      }
    />
  );
};

export default SideBar;
