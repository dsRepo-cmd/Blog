import React, { memo } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./ThemeSwitcher.module.scss";
import { Theme, useTheme } from "app/providers/ThemeProvider";
import Sun from "shared/assets/icons/sun.svg";
import Moon from "shared/assets/icons/moon.svg";
import Button, { ButtonTheme } from "shared/ui/Button/Button";

interface ThemeSwitcherProps {
  className?: string;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = memo(
  ({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    return (
      <Button
        theme={ButtonTheme.CLEAR}
        className={classNames(cls.ThemeSwitcher, {}, [className])}
        onClick={toggleTheme}
      >
        {theme === Theme.LIGHT ? <Sun /> : <Moon />}
      </Button>
    );
  }
);

export default ThemeSwitcher;
