import React, { memo, HTMLAttributeAnchorTarget } from "react";
import { Article, ArticleTextBlock } from "../../model/types/article";
import { ArticleBlockType, ArticleView } from "../../model/consts/consts";
import { classNames } from "@/shared/lib/classNames";
import { useTranslation } from "react-i18next";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";

import Text from "@/shared/ui/redesigned/Text/Text";
import { Icon } from "@/shared/ui/redesigned/Icon/Icon";
import EyeIcon from "@/shared/assets/icons/eye-r.svg";
import cls from "./ArticleListItem.module.scss";
import AppImage from "@/shared/ui/redesigned/AppImage/AppImage";
import Skeleton from "@/shared/ui/redesigned/Skeleton/Skeleton";
import { getRouteArticleDetails } from "@/shared/const/router";
import AppLink from "@/shared/ui/redesigned/AppLink/AppLink";
import Button from "@/shared/ui/redesigned/Button/Button";
import Card from "@/shared/ui/redesigned/Card/Card";
import Avatar from "@/shared/ui/redesigned/Avatar/Avatar";
import { getParticalformatDate } from "@/shared/lib/features/lib/getCurrentDate";

export interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const ArticleListItem: React.FC<ArticleListItemProps> = ({
  className,
  article,
  view,
  target,
}) => {
  const { t } = useTranslation("article");

  const userInfo = (
    <HStack gap="8">
      <Avatar size={32} src={article.user.avatar} className={cls.avatar} />
      <Text bold text={article.user.username} />
    </HStack>
  );

  const views = (
    <HStack gap="8">
      <Icon Svg={EyeIcon} />
      <Text text={String(article.views)} className={cls.views} />
    </HStack>
  );

  if (view === ArticleView.LIST) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT
    ) as ArticleTextBlock;

    return (
      <Card
        padding="24"
        max
        data-testid="ArticleListItem"
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <VStack max gap="16">
          <HStack justify={"between"} gap="8" max>
            {userInfo}
            <Text text={getParticalformatDate(article.createdAt)} />
          </HStack>
          <Text title={article.title} bold />
          <Text title={article.subtitle} size="s" />
          <AppImage
            fallback={
              <Skeleton className={cls.img} width="100%" height={250} />
            }
            src={article.img}
            className={cls.img}
            alt={article.title}
          />
          {textBlock?.paragraph && (
            <Text className={cls.textBlock} text={textBlock.paragraph} />
          )}
          <HStack max justify="between">
            <AppLink target={target} to={getRouteArticleDetails(article.id)}>
              <Button variant="outline">{t("Read more...")}</Button>
            </AppLink>
            {views}
          </HStack>
        </VStack>
      </Card>
    );
  }

  return (
    <AppLink
      data-testid="ArticleListItem"
      target={target}
      to={getRouteArticleDetails(article.id)}
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
    >
      <Card className={cls.card} border={"partial"} padding={"0"}>
        <AppImage
          fallback={<Skeleton width={"100%"} height={200} />}
          alt={article.title}
          src={article.img}
          className={cls.img}
        />
        <VStack className={cls.info} gap="4">
          <Text title={article.title} className={cls.title} />
          <VStack gap="4" className={cls.footer} max>
            <HStack justify="between" max>
              <Text
                text={getParticalformatDate(article.createdAt)}
                className={cls.date}
              />
              {views}
            </HStack>
            <HStack gap="4">{userInfo}</HStack>
          </VStack>
        </VStack>
      </Card>
    </AppLink>
  );
};

export default memo(ArticleListItem);
