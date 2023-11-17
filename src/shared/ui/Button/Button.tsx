import React from 'react'
import { type ButtonHTMLAttributes } from 'react'
import { classNames } from 'shared/lib/classNames'
import cls from './Button.module.scss'

export enum ThemeButton {
  CLEAR = 'clear',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ThemeButton
}

const Button: React.FC<ButtonProps> = (props) => {
  const { className, children, theme, ...restProps } = props
  return (
    <button
      className={classNames(cls.Button, {}, [className, cls[theme]])}
      {...restProps}
    >
      {children}
    </button>
  )
}

export default Button
