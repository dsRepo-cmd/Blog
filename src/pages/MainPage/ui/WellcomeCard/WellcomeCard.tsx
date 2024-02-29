import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./WellcomeCard.module.scss";
import { useTranslation } from "react-i18next";
import Card from "@/shared/ui/redesigned/Card/Card";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import Button from "@/shared/ui/redesigned/Button/Button";
import { Icon } from "@/shared/ui/redesigned/Icon/Icon";
import CreateIcon from "@/shared/assets/icons/font-add.svg";
import ViewIcon from "@/shared/assets/icons/font-book.svg";
import AppLink from "@/shared/ui/redesigned/AppLink/AppLink";
import { getRouteArticleCreate, getRouteArticles } from "@/shared/const/router";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import Text from "@/shared/ui/redesigned/Text/Text";

interface WellcomeCardProps {
  className?: string;
}

const WellcomeCard: React.FC<WellcomeCardProps> = ({ className }) => {
  const { t } = useTranslation("main");
  const authData = useSelector(getUserAuthData);

  return (
    <Card className={classNames(cls.WellcomeCard, {}, [className])}>
      <VStack gap="24" padding="24" align="center" justify="center">
        <Text align="center" size="l" bold title={t("Welcome To Blog")} />
        <Text
          align="center"
          size="m"
          bold
          text={t(
            "Here you'll find captivating articles, interesting ideas, and helpful tips. Dive into the world of knowledge with us."
          )}
        />

        {authData ? (
          <HStack
            className={cls.buttonsWrapper}
            gap="8"
            max
            align="center"
            justify="between"
          >
            <AppLink to={getRouteArticleCreate()}>
              <Button size="l" round>
                <HStack gap="8">
                  <Icon
                    className={cls.buttonIcon}
                    width={20}
                    Svg={CreateIcon}
                  />
                  <Text text={t("Create Article")} />
                </HStack>
              </Button>
            </AppLink>

            <AppLink to={getRouteArticles()}>
              <Button size="l" round>
                <HStack gap="8">
                  <Icon className={cls.buttonIcon} width={20} Svg={ViewIcon} />
                  <Text text={t("View Articles")} />
                </HStack>
              </Button>
            </AppLink>
          </HStack>
        ) : (
          <>
            <Text
              align="center"
              bold
              text={t("Please log in to create articles.")}
            />
            <AppLink to={getRouteArticles()}>
              <Button size="l" round>
                <HStack gap="8">
                  <Icon className={cls.buttonIcon} width={20} Svg={ViewIcon} />
                  <Text text={t("View Articles")} />
                </HStack>
              </Button>
            </AppLink>
          </>
        )}
      </VStack>
    </Card>
  );
};

export default memo(WellcomeCard);
