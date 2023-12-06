import React, { memo } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./ArticleList.module.scss";
import { useTranslation } from "react-i18next";
import { Article, ArticleView } from "entities/Article/model/types/article";
import ArticleListItem from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
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
}) => {
  const { t } = useTranslation();

  const renderArticle = (article: Article) => {
    return <ArticleListItem key={article.id} view={view} article={article} />;
  };

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles.length > 0 ? articles.map(renderArticle) : null}
      {isLoading && getSkeletons(view)}
    </div>
  );
};

export default memo(ArticleList);
