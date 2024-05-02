import React, { memo, HTMLAttributeAnchorTarget } from "react";
import { Article, ArticleTextBlock } from "../../model/types/article";
import { ArticleBlockType, ArticleView } from "../../model/consts/consts";
import { classNames } from "@/shared/lib/classNames";
import { useTranslation } from "react-i18next";
import { HStack, VStack } from "@/shared/ui/Stack";
import Text from "@/shared/ui/Text/Text";
import { Icon } from "@/shared/ui/Icon/Icon";
import EyeIcon from "@/shared/assets/icons/eye-r.svg";
import cls from "./ArticleListItem.module.scss";
import AppImage from "@/shared/ui/AppImage/AppImage";
import Skeleton from "@/shared/ui/Skeleton/Skeleton";
import { getRouteArticleDetails, getRouteProfile } from "@/shared/const/router";
import AppLink from "@/shared/ui/AppLink/AppLink";
import Card from "@/shared/ui/Card/Card";
import Avatar from "@/shared/ui/Avatar/Avatar";
import { getParticalformatDate } from "@/shared/lib/features/lib/getCurrentDate";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import { isMobile } from "react-device-detect";

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
  const userData = useSelector(getUserAuthData);

  const userInfo = (
    <>
      {userData ? (
        <AppLink to={getRouteProfile(article.user.id)}>
          <HStack gap="8">
            <Avatar
              size={32}
              src={article.user.avatar}
              className={cls.avatar}
            />
            <Text bold text={article.user.username} />
          </HStack>
        </AppLink>
      ) : (
        <HStack gap="8">
          <Avatar size={32} src={article.user.avatar} className={cls.avatar} />
          <Text bold text={article.user.username} />
        </HStack>
      )}
    </>
  );

  const views = (
    <HStack align={"center"} gap="8">
      <Icon width={24} Svg={EyeIcon} />
      <Text text={String(article.views)} className={cls.views} />
    </HStack>
  );

  //For Mobile
  if (isMobile) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT
    ) as ArticleTextBlock;
    return (
      <Card
        padding="0"
        max
        data-testid="ArticleListItem"
        className={classNames(cls.ArticleListItem, {}, [className, cls.mobile])}
      >
        <AppLink
          className={cls.img}
          target={target}
          to={getRouteArticleDetails(article.id)}
        >
          <AppImage
            fallback={
              <Skeleton className={cls.img} width="100%" height={250} />
            }
            src={article.img}
            className={cls.img}
            alt={article.title}
          />
        </AppLink>

        <VStack padding="16" max gap="16">
          <HStack justify={"between"} gap="8" max>
            {userInfo}
            <Text text={getParticalformatDate(article.createdAt)} />
          </HStack>

          <Text title={article.title} bold />
          <Text title={article.subtitle} size="s" />

          {textBlock?.paragraph && (
            <Text className={cls.textBlock} text={textBlock.paragraph} />
          )}
          <HStack max align={"end"} justify={"end"}>
            {views}
          </HStack>
        </VStack>
      </Card>
    );
  }

  //For list

  if (view === ArticleView.LIST) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT
    ) as ArticleTextBlock;

    return (
      <Card
        padding="0"
        max
        data-testid="ArticleListItem"
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <AppLink
          className={cls.img}
          target={target}
          to={getRouteArticleDetails(article.id)}
        >
          <AppImage
            fallback={
              <Skeleton className={cls.img} width="100%" height={250} />
            }
            src={article.img}
            className={cls.img}
            alt={article.title}
          />
        </AppLink>

        <VStack padding="16" max gap="16">
          <HStack justify={"between"} gap="8" max>
            {userInfo}
            <Text text={getParticalformatDate(article.createdAt)} />
          </HStack>

          <Text title={article.title} bold />
          <Text title={article.subtitle} size="s" />

          {textBlock?.paragraph && (
            <Text className={cls.textBlock} text={textBlock.paragraph} />
          )}
          <HStack max align={"end"} justify={"end"}>
            {views}
          </HStack>
        </VStack>
      </Card>
    );
  }

  //For details

  return (
    <Card
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      border={"partial"}
      padding={"0"}
    >
      <AppLink
        data-testid="ArticleListItem"
        target={target}
        to={getRouteArticleDetails(article.id)}
      >
        <AppImage
          fallback={<Skeleton width={"100%"} height={200} />}
          alt={article.title}
          src={article.img}
          className={cls.img}
        />
      </AppLink>

      <VStack maxHeight padding="12" className={cls.info} gap="4">
        <Text title={article.title} className={cls.title} />

        <HStack justify="between" max>
          <HStack gap="4">{userInfo}</HStack>
          <Text
            text={getParticalformatDate(article.createdAt)}
            className={cls.date}
          />
        </HStack>

        <VStack gap="4" className={cls.footer} max>
          {views}
        </VStack>
      </VStack>
    </Card>
  );
};

export default memo(ArticleListItem);
