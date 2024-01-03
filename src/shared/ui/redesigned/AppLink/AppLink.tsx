import { classNames } from "@/shared/lib/classNames";
import cls from "./AppLink.module.scss";
import { LinkProps } from "react-router-dom";
import {
  FC,
  ForwardedRef,
  ReactNode,
  TransitionEventHandler,
  memo,
} from "react";
import { NavLink } from "react-router-dom";

export type AppLinkVariant = "primary" | "red";

export interface AppLinkProps extends LinkProps {
  forwardedRef?: ForwardedRef<HTMLAnchorElement>;
  onTransitionEndCapture?: TransitionEventHandler<HTMLAnchorElement>;

  className?: string;
  variant?: AppLinkVariant;
  children?: ReactNode;
  activeClassName?: string;
}

const AppLink: FC<AppLinkProps> = (props) => {
  const {
    children,
    className,
    forwardedRef,
    to,
    activeClassName = "",
    variant = "primary",
    onTransitionEndCapture,
    ...restProps
  } = props;

  return (
    <NavLink
      ref={forwardedRef}
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
};

export default memo(AppLink);
