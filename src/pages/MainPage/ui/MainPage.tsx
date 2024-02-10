import React, { memo, useEffect, useState } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./MainPage.module.scss";
import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page";
import Text from "@/shared/ui/redesigned/Text/Text";
import AppImage from "@/shared/ui/redesigned/AppImage/AppImage";
import { VStack } from "@/shared/ui/redesigned/Stack";
import Skeleton from "@/shared/ui/redesigned/Skeleton/Skeleton";
import Card from "@/shared/ui/redesigned/Card/Card";

interface MainPageProps {
  className?: string;
}

const MainPage: React.FC<MainPageProps> = ({ className }) => {
  const { t } = useTranslation("main");

  return (
    <Page
      id="main-page-container"
      data-testid="MainPage"
      className={classNames(cls.MainPage, {}, [className])}
    >
      <Card className={classNames(cls.card, {}, [className])}>
        <VStack gap="24" padding="24" align="center" justify="center">
          <Text size="l" bold title={t("Welcome To Blog!")} />
          <Text
            size="m"
            bold
            text={t(
              "Here you'll find captivating articles, interesting ideas, and helpful tips. Dive into the world of knowledge with us!"
            )}
          />
        </VStack>
      </Card>

      <AppImage
        fallback={<Skeleton width={"100%"} height={"100%"} />}
        className={classNames(cls.image, {}, [className])}
        src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </Page>
  );
};

export default memo(MainPage);
