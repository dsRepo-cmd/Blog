import React, { useCallback, useMemo, useState } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./SideBar.module.scss";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import SideBarItem from "./SideBarItem/SideBarItem";
import { useSelector } from "react-redux";
import { getSidebarItems } from "../../model/selector/getSideBarItems";
import LangSwitcher from "../../../../features/LangSwitcher/LangSwitcher";
import ArrowIcon from "@/shared/assets/icons/arrow-bottom.svg";
import { BrowserView, MobileView } from "react-device-detect";
import AppLogo from "@/shared/ui/redesigned/AppLogo/AppLogo";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Icon } from "@/shared/ui/redesigned/Icon/Icon";
import { Drawer } from "@/shared/ui/redesigned/Drawer/Drawer";

interface SideBarProps {
  className?: string;
}

const SideBar: React.FC<SideBarProps> = ({ className }: SideBarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const sideBarItemList = useSelector(getSidebarItems);

  const [isOpen, setIsOpen] = useState(false);

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(() => {
    return sideBarItemList.map((item) => (
      <SideBarItem collapsed={collapsed} item={item} key={item.path} />
    ));
  }, [collapsed, sideBarItemList]);

  return (
    <>
      <BrowserView className={cls.SidebarBox}>
        <aside
          data-testid="sidebar"
          className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
            className,
          ])}
        >
          <AppLogo size={collapsed ? 30 : 50} className={cls.appLogo} />
          <VStack role="navigation" gap="8" className={cls.items}>
            {itemsList}
          </VStack>
          <Icon
            positioned
            data-testid="sidebar-toggle"
            onClick={onToggle}
            className={cls.collapseBtn}
            Svg={ArrowIcon}
            clickable
          />
          <HStack align={"center"} className={cls.switchers}>
            <ThemeSwitcher />
            <LangSwitcher short={collapsed} className={cls.lang} />
          </HStack>
        </aside>
      </BrowserView>

      <MobileView className={cls.SidebarBoxMobile}>
        <nav
          data-testid="sidebar"
          className={classNames(cls.SidebarMobile, {}, [className])}
        >
          <div onClick={onOpenDrawer} className={cls.appLogo}>
            <AppLogo size={30} />
          </div>
          <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
            <div className={cls.drawer}>
              <VStack role="navigation" gap="8" className={cls.items}>
                {itemsList}
              </VStack>
              <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={cls.lang} />
              </div>
            </div>
          </Drawer>
        </nav>
      </MobileView>
    </>
  );
};

export default SideBar;
