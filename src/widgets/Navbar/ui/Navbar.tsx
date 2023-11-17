import { classNames } from "shared/lib/classNames";
import cls from "./Navbar.module.scss";
import AppLink, { AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC = ({ className }: NavbarProps) => {
  return (
    <div className={classNames(cls.navbar, {}, [])}>
      <div className={classNames(cls.links)}>
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          className={classNames(cls.navLink)}
          to={"/"}
        >
          Main
        </AppLink>
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          className={classNames(cls.navLink)}
          to={"/about"}
        >
          About
        </AppLink>
      </div>
    </div>
  );
};
