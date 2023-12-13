import React, { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./ThemeSwitcher.module.scss";
import SunIcon from "@/shared/assets/icons/sunD.svg";
import MoonIcon from "@/shared/assets/icons/moon-last-quarter.svg";
import StarIcon from "@/shared/assets/icons/star.svg";

import Button, { ButtonTheme } from "@/shared/ui/Button/Button";
import { Icon } from "@/shared/ui/Icon/Icon";
import { Theme } from "@/shared/const/theme";
import useTheme from "@/shared/lib/hooks/useTheme/useTheme";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { saveJsonSettings } from "@/entities/User";

interface ThemeSwitcherProps {
  className?: string;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = memo(
  ({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();
    const dispatch = useAppDispatch();

    const onToggleHandler = useCallback(() => {
      toggleTheme((newTheme) => {
        console.log("click");
        dispatch(saveJsonSettings({ theme: newTheme }));
      });
    }, [dispatch, toggleTheme]);

    return (
      <Button
        theme={ButtonTheme.CLEAR}
        className={classNames(cls.ThemeSwitcher, {}, [className])}
        onClick={onToggleHandler}
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
