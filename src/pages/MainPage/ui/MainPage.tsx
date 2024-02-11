import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./MainPage.module.scss";
import { Page } from "@/widgets/Page";
import WellcomeCard from "./WellcomeCard/WellcomeCard";

interface MainPageProps {
  className?: string;
}

const MainPage: React.FC<MainPageProps> = ({ className }) => {
  return (
    <Page
      id="main-page-container"
      data-testid="MainPage"
      className={classNames(cls.MainPage, {}, [className])}
    >
      <WellcomeCard />
    </Page>
  );
};

export default memo(MainPage);
