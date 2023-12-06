import React, { useMemo, useState } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./SideBar.module.scss";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";
import LangSwitcher from "widgets/LangSwitcher/LangSwitcher";
import Button, { ButtonSize, ButtonTheme } from "shared/ui/Button/Button";

import ArrowLeft from "shared/assets/icons/angle-left.svg";
import ArrowRight from "shared/assets/icons/angle-right.svg";

import SideBarItem from "./SideBarItem/SideBarItem";
import { useSelector } from "react-redux";
import { getSidebarItems } from "widgets/SideBar/model/selector/getSideBarItems";

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
    <menu
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

      <div className={cls.items}>{itemsList}</div>

      <div className={cls.switchers}>
        <LangSwitcher />
        <ThemeSwitcher />
      </div>
    </menu>
  );
};

export default SideBar;
