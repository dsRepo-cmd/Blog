import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { getArticles } from "../../model/slices/articlePageSlice";
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors";
import { ArticleList } from "@/entities/Article";
import Text from "@/shared/ui/Text/Text";

interface ArticleInfinitListProps {
  className?: string;
}

const ArticleInfinitList: React.FC<ArticleInfinitListProps> = ({
  className,
}) => {
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useSelector(getArticlesPageView);
  const error = useSelector(getArticlesPageError);
  const { t } = useTranslation();

  if (error) {
    return <Text text={t("Error loading articles")} />;
  }
  return (
    <ArticleList
      isLoading={isLoading}
      view={view}
      articles={articles}
      className={className}
    />
  );
};

export default memo(ArticleInfinitList);
