import React, { memo, useCallback, useEffect } from "react";
import { classNames } from "@/shared/lib/classNames";
import DynamicModuleLoader, {
  ReducerList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { articlesPageReducer } from "../../model/slices/articlePageSlice";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import ArticleInfinitList from "../ArticleInfinitList/ArticleInfinitList";
import { Page } from "@/widgets/Page";
import { ArticlePageGreeting } from "@/features/articlePageGreeting";
import StickyContentLayout from "@/shared/layouts/StickyContentLayout/StickyContentLayout";
import ViewSelectorContainer from "../ViewSelectorContainer/ViewSelectorContainer";
import { FiltersContainer } from "../FiltersContainer/FiltersContainer";
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList";

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducerList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage: React.FC<ArticlesPageProps> = ({ className }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchArticlesList({}));
  }, [dispatch]);

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  const content = (
    <StickyContentLayout
      left={<ViewSelectorContainer />}
      right={<FiltersContainer />}
      content={
        <Page
          data-testid="ArticlesPage"
          onScrollEnd={onLoadNextPart}
          className={classNames("", {}, [className])}
        >
          <ArticleInfinitList />
          <ArticlePageGreeting />
        </Page>
      }
    />
  );

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      {content}
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
