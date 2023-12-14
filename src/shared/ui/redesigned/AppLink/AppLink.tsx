import { classNames } from "@/shared/lib/classNames";
import cls from "./AppLink.module.scss";
import { Link, LinkProps } from "react-router-dom";
import { FC, ReactNode, memo } from "react";
import { NavLink } from "react-router-dom";

export type AppLinkVariant = "primary" | "red";

interface AppLinkProps extends LinkProps {
  className?: string;
  variant?: AppLinkVariant;
  children?: ReactNode;
  activeClassName?: string;
}

const AppLink: FC<AppLinkProps> = memo((props) => {
  const {
    children,
    className,
    to,
    activeClassName = "",
    variant = "primary",
    ...restProps
  } = props;

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames(cls.AppLink, { [activeClassName]: isActive }, [
          className,
          cls[variant],
        ])
      }
      {...restProps}
    >
      {children}
    </NavLink>
  );
});

export default AppLink;
