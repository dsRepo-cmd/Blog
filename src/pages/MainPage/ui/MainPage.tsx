import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./MainPage.module.scss";
import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page";

import Text from "@/shared/ui/deprecated/Text/Text";

interface MainPageProps {
  className?: string;
}

const MainPage: React.FC<MainPageProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <Page
      data-testid="MainPage"
      className={classNames(cls.MainPage, {}, [className])}
    >
      <Text title={t("MainPage")} />
    </Page>
  );
};

export default memo(MainPage);
