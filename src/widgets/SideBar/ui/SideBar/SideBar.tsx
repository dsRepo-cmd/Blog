import React, { useMemo, useState } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./SideBar.module.scss";
import { ThemeSwitcher } from "@/widgets/ThemeSwitcher";

import Button, { ButtonSize, ButtonTheme } from "@/shared/ui/Button/Button";

import ArrowLeft from "@/shared/assets/icons/angle-left.svg";
import ArrowRight from "@/shared/assets/icons/angle-right.svg";

import SideBarItem from "./SideBarItem/SideBarItem";
import { useSelector } from "react-redux";
import { getSidebarItems } from "../../model/selector/getSideBarItems";
import { VStack } from "@/shared/ui/Stack";
import LangSwitcher from "../../../LangSwitcher/LangSwitcher";

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

      <VStack role="navigation" align="start" gap="12" className={cls.items}>
        {itemsList}
      </VStack>

      <div className={cls.switchers}>
        <LangSwitcher />
        <ThemeSwitcher />
      </div>
    </aside>
  );
};

export default SideBar;
