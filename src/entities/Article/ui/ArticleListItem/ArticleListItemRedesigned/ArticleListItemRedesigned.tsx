import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import cls from "./ArticleListItemRedesigned.module.scss";
import { ArticleListItemProps } from "../ArticleListItem";
import Text from "@/shared/ui/redesigned/Text/Text";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Icon } from "@/shared/ui/redesigned/Icon/Icon";
import {
  ArticleBlockType,
  ArticleView,
} from "@/entities/Article/model/consts/consts";
import { ArticleTextBlock } from "@/entities/Article/model/types/article";
import { classNames } from "@/shared/lib/classNames";
import Card from "@/shared/ui/redesigned/Card/Card";
import Avatar from "@/shared/ui/redesigned/Avatar/Avatar";
import AppImage from "@/shared/ui/redesigned/AppImage/AppImage";
import AppLink from "@/shared/ui/redesigned/AppLink/AppLink";
import Skeleton from "@/shared/ui/redesigned/Skeleton/Skeleton";
import { getRouteArticleDetails } from "@/shared/const/router";
import Button from "@/shared/ui/redesigned/Button/Button";
import EyeIcon from "@/shared/assets/icons/eye-r.svg";

const ArticleListItemRedesigned: FC<ArticleListItemProps> = ({
  className,
  article,
  view,
  target,
}) => {
  const { t } = useTranslation();

  const userInfo = (
    <>
      <Avatar size={32} src={article.user.avatar} className={cls.avatar} />
      <Text bold text={article.user.username} />
    </>
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
          <HStack gap="8" max>
            {userInfo}
            <Text text={article.createdAt} />
          </HStack>
          <Text title={article.title} bold />
          <Text title={article.subtitle} size="s" />
          <AppImage
            fallback={<Skeleton width="100%" height={250} />}
            src={article.img}
            className={cls.img}
            alt={article.title}
          />
          {textBlock?.paragraphs && (
            <Text
              className={cls.textBlock}
              text={textBlock.paragraphs.slice(0, 2).join(" ")}
            />
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
          fallback={<Skeleton width={200} height={200} />}
          alt={article.title}
          src={article.img}
          className={cls.img}
        />
        <VStack className={cls.info} gap="4">
          <Text title={article.title} className={cls.title} />
          <VStack gap="4" className={cls.footer} max>
            <HStack justify="between" max>
              <Text text={article.createdAt} className={cls.date} />
              {views}
            </HStack>
            <HStack gap="4">{userInfo}</HStack>
          </VStack>
        </VStack>
      </Card>
    </AppLink>
  );
};

export default memo(ArticleListItemRedesigned);
