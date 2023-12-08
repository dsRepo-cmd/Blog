import React, { memo, useEffect } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./ArticleInfinitList.module.scss";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { initArticlesPage } from "pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage";
import ArticleList from "entities/Article/ui/ArticleList/ArticleList";
import { getArticles } from "pages/ArticlesPage/model/slices/articlePageSlice";
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from "pages/ArticlesPage/model/selectors/articlesPageSelectors";
import { VStack } from "shared/ui/Stack";

interface ArticleInfinitListProps {
  className?: string;
}

const ArticleInfinitList: React.FC<ArticleInfinitListProps> = ({
  className,
}) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const error = useSelector(getArticlesPageError);
  const view = useSelector(getArticlesPageView);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(initArticlesPage(searchParams));
  }, [dispatch]);

  return (
    <VStack
      gap="16"
      className={classNames(cls.ArticleInfinitList, {}, [className])}
    >
      <ArticleList
        className={cls.list}
        view={view}
        isLoading={isLoading}
        articles={articles}
      />
    </VStack>
  );
};

export default memo(ArticleInfinitList);
