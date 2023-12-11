import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./ThemeSwitcher.module.scss";
import { Theme, useTheme } from "@/app/providers/ThemeProvider";
import SunIcon from "@/shared/assets/icons/sunD.svg";
import MoonIcon from "@/shared/assets/icons/moon-last-quarter.svg";
import StarIcon from "@/shared/assets/icons/star.svg";

import Button, { ButtonTheme } from "@/shared/ui/Button/Button";
import { Icon } from "@/shared/ui/Icon/Icon";

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
        {theme === Theme.LIGHT ? (
          <Icon Svg={StarIcon} />
        ) : theme === Theme.DARK ? (
          <Icon Svg={SunIcon} />
        ) : (
          <Icon Svg={MoonIcon} />
        )}
      </Button>
    );
  }
);

export default ThemeSwitcher;
