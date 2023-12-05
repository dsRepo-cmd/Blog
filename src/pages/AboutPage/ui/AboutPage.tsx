import React, { memo } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./AboutPage.module.scss";
import { useTranslation } from "react-i18next";

interface AboutPageProps {
  className?: string;
}

const AboutPage: React.FC<AboutPageProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.AboutPage, {}, [className])}>
      {t("About Page")}
    </div>
  );
};

export default AboutPage;
