import { classNames } from "@/shared/lib/classNames";
import cls from "./AppLink.module.scss";
import { Link, LinkProps } from "react-router-dom";
import { FC, ReactNode, memo } from "react";

export enum AppLinkTheme {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  BTN_PRIMARY = "bntPrimary",
  BTN_SECONDARY = "btnSecondary",
}

interface AppLinkProps extends LinkProps {
  children?: ReactNode;
  className?: string;
  theme?: AppLinkTheme;
}

const AppLink: FC<AppLinkProps> = memo((props) => {
  const {
    children,
    className,
    to,
    theme = AppLinkTheme.PRIMARY,
    ...restProps
  } = props;

  return (
    <Link
      to={to}
      className={classNames(cls.AppLink, {}, [className, cls[theme]])}
      {...restProps}
    >
      {children}
    </Link>
  );
});

export default AppLink;
