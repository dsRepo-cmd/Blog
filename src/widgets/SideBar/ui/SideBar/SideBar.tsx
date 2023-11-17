import React, { useState } from 'react'

import { classNames } from 'shared/lib/classNames'
import cls from './SideBar.module.scss'
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher'
import LangSwitcher from 'widgets/LangSwitcher/LangSwitcher'

interface SideBarProps {
  className?: string
}

const SideBar: React.FC<SideBarProps> = ({ className }: SideBarProps) => {
  const [collapsed, setCollapsed] = useState(false)

  const onToggle = () => {
    setCollapsed((prev) => !prev)
  }

  return (
    <div
      className={classNames(cls.SideBar, { [cls.collapsed]: collapsed }, [])}
    >
      <button onClick={onToggle}>click</button>
      <div className={cls.switchers}>
        <LangSwitcher />
        <ThemeSwitcher />
      </div>
    </div>
  )
}

export default SideBar
