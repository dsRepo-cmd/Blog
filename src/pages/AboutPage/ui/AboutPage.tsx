import React from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./AboutPage.module.scss";
import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page";
import Text from "@/shared/ui/redesigned/Text/Text";

interface AboutPageProps {
  className?: string;
}

const AboutPage: React.FC<AboutPageProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <Page
      data-testid={"AboutPage"}
      className={classNames(cls.AboutPage, {}, [className])}
    >
      <Text title={t("AboutPage")} />
    </Page>
  );
};

export default AboutPage;
