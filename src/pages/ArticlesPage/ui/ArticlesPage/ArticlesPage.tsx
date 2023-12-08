import React, { memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./ArticlesPage.module.scss";
import { useTranslation } from "react-i18next";
import DynamicModuleLoader, {
  ReducerList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { articlesPageReducer } from "../../model/slices/articlePageSlice";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import ArticlesPageFilters from "../ArticlesPageFilters/ArticlesPageFilters";
import ArticleInfinitList from "../ArticleInfinitList/ArticleInfinitList";
import { Page } from "widgets/Page";

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducerList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage: React.FC<ArticlesPageProps> = ({ className }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.ArticlesPage, {}, [className])}
      >
        <ArticlesPageFilters />
        <ArticleInfinitList />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
