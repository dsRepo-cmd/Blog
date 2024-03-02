import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
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
      className={classNames("", {}, [className])}
    >
      <WellcomeCard />
    </Page>
  );
};

export default memo(MainPage);
