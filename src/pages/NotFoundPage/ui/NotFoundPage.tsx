import React from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./NotFoundPage.module.scss";
import { useTranslation } from "react-i18next";
import Page from "widgets/Page/ui/Page";

interface NotFoundPageProps {
  className?: string;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({
  className,
}: NotFoundPageProps) => {
  const { t } = useTranslation();
  return (
    <Page className={classNames(cls.NotFoundPage, {}, [className])}>
      {t("Page Not Found")}
    </Page>
  );
};

export default NotFoundPage;
