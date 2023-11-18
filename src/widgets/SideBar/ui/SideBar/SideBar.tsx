import React, { useState } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./SideBar.module.scss";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";
import LangSwitcher from "widgets/LangSwitcher/LangSwitcher";
import Button, { ButtonSize, ButtonTheme } from "shared/ui/Button/Button";
import AppLink, { AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { useTranslation } from "react-i18next";
import About from "shared/assets/icons/document.svg";
import Main from "shared/assets/icons/home.svg";
import ArrowLeft from "shared/assets/icons/angle-left.svg";
import ArrowRight from "shared/assets/icons/angle-right.svg";

interface SideBarProps {
  className?: string;
}

const SideBar: React.FC<SideBarProps> = ({ className }: SideBarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const { t } = useTranslation();

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
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

      <div className={cls.items}>
        <AppLink
          className={cls.item}
          theme={AppLinkTheme.SECONDARY}
          to={RoutePath.main}
        >
          <Main className={cls.icon} />
          <span className={classNames(cls.navLink)}>{t("Main")}</span>
        </AppLink>

        <AppLink
          theme={AppLinkTheme.SECONDARY}
          className={cls.item}
          to={RoutePath.about}
        >
          <About className={cls.icon} />
          <span className={classNames(cls.navLink)}>{t("About")}</span>
        </AppLink>
      </div>

      <div className={cls.switchers}>
        <LangSwitcher />
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default SideBar;
