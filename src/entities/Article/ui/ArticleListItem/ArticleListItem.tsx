import { useNavigate } from "react-router-dom";
import React, { memo, useCallback, HTMLAttributeAnchorTarget } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames";
import cls from "./ArticleListItem.module.scss";
import { Article, ArticleTextBlock } from "../../model/types/article";
import Text from "@/shared/ui/Text/Text";
import Button, { ButtonTheme } from "@/shared/ui/Button/Button";
import EyeIcon from "@/shared/assets/icons/eye.svg";
import Card from "@/shared/ui/Card/Card";
import { Icon } from "@/shared/ui/Icon/Icon";
import Avatar from "@/shared/ui/Avatar/Avatar";
import ArticleTextBlockComponent from "../ArticleTextBlockComponent/ArticleTextBlockComponent";

import AppLink from "@/shared/ui/AppLink/AppLink";
import { ArticleBlockType, ArticleView } from "../../model/consts/consts";
import { getRouteArticleDetails } from "@/shared/const/router";
import AppImage from "@/shared/ui/AppImage/AppImage";
import Skeleton from "@/shared/ui/Skeleton/Skeleton";

interface ArticleListItemProps {
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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const onOpenArticle = useCallback(() => {
    navigate(getRouteArticleDetails(article.id));
  }, [article.id, navigate]);

  const types = <Text text={article.type.join(", ")} className={cls.types} />;
  const views = (
    <div className={cls.views}>
      <Text text={String(article.views)} />
      <Icon width={16} height={16} Svg={EyeIcon} />
    </div>
  );

  if (view === ArticleView.LIST) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT
    ) as ArticleTextBlock;

    return (
      <div
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={cls.username} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text title={article.title} className={cls.title} />
          {types}
          <AppImage
            fallback={<Skeleton width={"100%"} height={"100%"} />}
            src={article.img}
            className={cls.img}
            alt={article.title}
          />
          {textBlock && (
            <ArticleTextBlockComponent
              block={textBlock}
              className={cls.textBlock}
            />
          )}
          <div className={cls.footer}>
            <AppLink target={target} to={getRouteArticleDetails(article.id)}>
              <Button theme={ButtonTheme.OUTLINE_INVERTED}>
                {t("Read more...")}
              </Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    );
  }
  return (
    <AppLink
      target={target}
      to={getRouteArticleDetails(article.id)}
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
    >
      <Card onClick={onOpenArticle} className={cls.card}>
        <div className={cls.imageWrapper}>
          <AppImage
            fallback={<Skeleton width={"100%"} height={"100%"} />}
            alt={article.title}
            src={article.img}
            className={cls.img}
          />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={cls.title} />
      </Card>
    </AppLink>
  );
};

export default memo(ArticleListItem);
