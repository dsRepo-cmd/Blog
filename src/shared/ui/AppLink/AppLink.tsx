import { classNames } from 'shared/lib/classNames'
import cls from './AppLink.module.scss'
import { Link, type LinkProps } from 'react-router-dom'
import { type FC } from 'react'

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
  className?: string
  theme?: AppLinkTheme
}

const AppLink: FC<AppLinkProps> = (props) => {
  const {
    children,
    className,
    to,
    theme = AppLinkTheme.PRIMARY,
    ...restProps
  } = props

  return (
    <Link
      to={to}
      className={classNames(cls.AppLink, {}, [className, cls[theme]])}
      {...restProps}
    >
      {children}
    </Link>
  )
}

export default AppLink
