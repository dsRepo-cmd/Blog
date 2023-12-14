import React, { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./ThemeSwitcher.module.scss";
import SunIconDeprecated from "@/shared/assets/icons/sunD.svg";
import MoonIconDeprecated from "@/shared/assets/icons/moon-last-quarter.svg";
import StarIconDeprecated from "@/shared/assets/icons/star.svg";
import ThemeIcon from "@/shared/assets/icons/theme.svg";
import Button, { ButtonTheme } from "@/shared/ui/deprecated/Button/Button";
import { Icon as IconDeprecated } from "@/shared/ui/deprecated/Icon/Icon";
import { Theme } from "@/shared/const/theme";
import useTheme from "@/shared/lib/hooks/useTheme/useTheme";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { saveJsonSettings } from "@/entities/User";
import { ToggleFeatures } from "@/shared/lib/features/ToggleFeatures/ToggleFeatures";
import { Icon } from "@/shared/ui/redesigned/Icon/Icon";

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
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<Icon Svg={ThemeIcon} clickable onClick={onToggleHandler} />}
        off={
          <Button
            theme={ButtonTheme.CLEAR}
            className={classNames(cls.ThemeSwitcher, {}, [className])}
            onClick={onToggleHandler}
          >
            {theme === Theme.LIGHT ? (
              <IconDeprecated width={32} height={32} Svg={StarIconDeprecated} />
            ) : theme === Theme.DARK ? (
              <IconDeprecated width={32} height={32} Svg={SunIconDeprecated} />
            ) : (
              <IconDeprecated width={32} height={32} Svg={MoonIconDeprecated} />
            )}
          </Button>
        }
      />
    );
  }
);

export default ThemeSwitcher;
