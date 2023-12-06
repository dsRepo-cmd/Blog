import React, { memo, useEffect, useCallback } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./ArticlesPage.module.scss";
import { useTranslation } from "react-i18next";
import ArticleList from "entities/Article/ui/ArticleList/ArticleList";
import DynamicModuleLoader, {
  ReducerList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
  articlesPageActions,
  articlesPageReducer,
  getArticles,
} from "../model/slices/articlePageSlice";
import { ArticleView, ArticleViewSelector } from "entities/Article";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchArticlesList } from "../model/services/fetchArticlesList";
import { useSelector } from "react-redux";
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from "../model/selectors/articlesPageSelectors";

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducerList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage: React.FC<ArticlesPageProps> = ({ className }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const error = useSelector(getArticlesPageError);
  const view = useSelector(getArticlesPageView);

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchArticlesList());
    dispatch(articlesPageActions.initState());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ArticlesPage, {}, [className])}>
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
        <ArticleList view={view} isLoading={isLoading} articles={articles} />
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
