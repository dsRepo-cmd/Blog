import React, { memo } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./AboutPage.module.scss";
import { useTranslation } from "react-i18next";
import Page from "widgets/Page/ui/Page";

interface AboutPageProps {
  className?: string;
}

const AboutPage: React.FC<AboutPageProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <Page className={classNames(cls.AboutPage, {}, [className])}>
      {t("About Page")}
    </Page>
  );
};

export default AboutPage;
