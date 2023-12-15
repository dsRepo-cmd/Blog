import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./AppLogo.module.scss";
import AppSvg from "@/shared/assets/icons/logo.svg";
import { HStack } from "../Stack";

interface AppLogoProps {
  className?: string;
  size?: number;
}

const AppLogo: React.FC<AppLogoProps> = ({ className, size = 50 }) => {
  return (
    <HStack
      max
      justify="center"
      className={classNames(cls.appLogoWrapper, {}, [className])}
    >
      <AppSvg
        width={size}
        height={size}
        color="black"
        className={cls.appLogo}
      />
      <div className={cls.gradientBig} />
      <div className={cls.gradientSmall} />
    </HStack>
  );
};

export default memo(AppLogo);
