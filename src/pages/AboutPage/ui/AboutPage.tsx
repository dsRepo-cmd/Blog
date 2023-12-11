import React from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./AboutPage.module.scss";
import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page";

interface AboutPageProps {
  className?: string;
}

const AboutPage: React.FC<AboutPageProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <Page className={classNames(cls.AboutPage, {}, [className])}>
      AboutPage
    </Page>
  );
};

export default AboutPage;
