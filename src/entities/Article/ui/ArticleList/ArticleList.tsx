import React, { memo, HTMLAttributeAnchorTarget } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./ArticleList.module.scss";
import { useTranslation } from "react-i18next";

import ArticleListItem from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import Text, { TextSize } from "shared/ui/Text/Text";
import { ArticleView } from "../../model/consts/consts";
import { Article } from "../../model/types/article";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.DETAILS ? 18 : 3)
    .fill(0)
    .map((item, index) => (
      <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    ));

const ArticleList: React.FC<ArticleListProps> = ({
  className,
  articles,
  isLoading,
  view = ArticleView.LIST,
  target,
}) => {
  const { t } = useTranslation();

  const renderArticle = (article: Article) => {
    return (
      <ArticleListItem
        target={target}
        key={article.id}
        view={view}
        article={article}
      />
    );
  };

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Text size={TextSize.L} title={t("Articles not found")} />
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles.length > 0 ? articles.map(renderArticle) : null}
      {isLoading && getSkeletons(view)}
    </div>
  );
};

export default memo(ArticleList);
