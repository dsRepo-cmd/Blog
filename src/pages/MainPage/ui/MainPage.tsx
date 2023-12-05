import React, { memo } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./MainPage.module.scss";
import { useTranslation } from "react-i18next";
import { Counter } from "entities/Counter";

interface MainPageProps {
  className?: string;
}

const MainPage: React.FC<MainPageProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.MainPage, {}, [className])}>
      {t("Main Page")} <Counter />
    </div>
  );
};

export default memo(MainPage);
