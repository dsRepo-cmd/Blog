import React, { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames";
import DynamicModuleLoader, {
  ReducerList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { VStack } from "@/shared/ui/Stack";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice";
import { fetchArticleById } from "../../model/services/fetchArticleById";
import { useSelector } from "react-redux";
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from "../../model/selectors/articleDetails";
import cls from "./ArticleDetails.module.scss";
import { renderArticleBlock } from "./renderBlock";
import Text from "@/shared/ui/Text/Text";
import AppImage from "@/shared/ui/AppImage/AppImage";
import Skeleton from "@/shared/ui/Skeleton/Skeleton";
import { useParams } from "react-router-dom";

interface ArticleDetailsProps {
  className?: string;
}
const redusers: ReducerList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetailsSkeleton = () => {
  return (
    <VStack gap="16" max>
      <Skeleton className={cls.title} width={"70%"} height={40} />
      <Skeleton className={cls.subtitle} width={"50%"} height={24} />
      <Skeleton className={cls.skeleton} width="100%" height={350} />
      <Skeleton className={cls.skeleton} width="100%" height={200} />
    </VStack>
  );
};

const ArticleDetails: React.FC<ArticleDetailsProps> = ({ className }) => {
  const { t } = useTranslation("article");
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const article = useSelector(getArticleDetailsData);
  const error = useSelector(getArticleDetailsError);

  let content;

  if (isLoading) {
    content = <ArticleDetailsSkeleton />;
  } else if (error) {
    content = (
      <Text
        align={"center"}
        title={t("There was an error loading the article")}
      />
    );
  } else {
    content = (
      <>
        <Text title={article?.title} size="l" bold />
        <Text title={article?.subtitle} />
        <AppImage
          fallback={<Skeleton width="100%" height={420} border="16px" />}
          src={article?.img}
          className={cls.img}
        />
        {article?.blocks.map(renderArticleBlock)}
      </>
    );
  }

  if (id)
    useEffect(() => {
      if (__PROJECT__ !== "storybook") {
        dispatch(fetchArticleById(id));
      }
    }, [dispatch, id]);

  return (
    <DynamicModuleLoader reducers={redusers} removeAfterUnmount>
      <VStack
        gap="16"
        max
        className={classNames(cls.ArticleDetails, {}, [className])}
      >
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetails);
