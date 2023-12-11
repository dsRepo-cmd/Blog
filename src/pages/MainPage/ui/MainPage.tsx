import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./MainPage.module.scss";
import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page";
import { RatingCard } from "@/entities/Rating";

interface MainPageProps {
  className?: string;
}

const MainPage: React.FC<MainPageProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <Page className={classNames(cls.MainPage, {}, [className])}>
      <RatingCard title="Hello" feedbackTitle="feedbackTitle" hasFeedback />
    </Page>
  );
};

export default memo(MainPage);
