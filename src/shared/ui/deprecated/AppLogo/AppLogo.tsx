import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./AppLogo.module.scss";
import AppSvg from "@/shared/assets/icons/app-logo.svg";
import { HStack } from "../Stack";

interface AppLogoProps {
  className?: string;
}

/**
 * Outdated, use new components from the redesigned folder
 * @deprecated
 */

const AppLogo: React.FC<AppLogoProps> = ({ className }) => {
  return (
    <HStack
      max
      justify="center"
      className={classNames(cls.appLogoWrapper, {}, [className])}
    >
      <div className={cls.gradientBig} />
      <div className={cls.gradientSmall} />
      <AppSvg className={cls.appLogo} />
    </HStack>
  );
};

export default memo(AppLogo);
