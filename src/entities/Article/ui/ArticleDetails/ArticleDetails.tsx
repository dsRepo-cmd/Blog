import React, { memo, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames";
import DynamicModuleLoader, {
  ReducerList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import Text, {
  TextAlign,
  TextSize,
  TextTheme,
} from "@/shared/ui/deprecated/Text/Text";
import Skeleton from "@/shared/ui/deprecated/Skeleton/Skeleton";
import EyeIcon from "@/shared/assets/icons/eye.svg";
import CalendarIcon from "@/shared/assets/icons/calendar.svg";

import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice";
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById";
import { useSelector } from "react-redux";
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from "../../model/selectors/articleDetails";
import ArticleCodeBlockComponent from "../ArticleCodeBlockComponent/ArticleCodeBlockComponent";
import ArticleTextBlockComponent from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import ArticleImageBlockComponent from "../ArticleImageBlockComponent/ArticleImageBlockComponent";
import { ArticleBlock } from "../../model/types/article";
import { ArticleBlockType } from "../../model/consts/consts";
import cls from "./ArticleDetails.module.scss";
import { Icon } from "@/shared/ui/deprecated/Icon/Icon";
import Avatar from "@/shared/ui/deprecated/Avatar/Avatar";

interface ArticleDetailsProps {
  className?: string;
  id: string;
}
const redusers: ReducerList = {
  articleDetails: articleDetailsReducer,
};

const ArticleDetails: React.FC<ArticleDetailsProps> = ({ className, id }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);

  const error = useSelector(getArticleDetailsError);
  const article = useSelector(getArticleDetailsData);
  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return (
          <ArticleCodeBlockComponent
            key={block.id}
            block={block}
            className={cls.block}
          />
        );
      case ArticleBlockType.TEXT:
        return (
          <ArticleTextBlockComponent
            key={block.id}
            block={block}
            className={cls.block}
          />
        );
      case ArticleBlockType.IMAGE:
        return (
          <ArticleImageBlockComponent
            key={block.id}
            block={block}
            className={cls.block}
          />
        );

      default:
        return null;
    }
  }, []);

  useEffect(() => {
    dispatch(fetchArticleById(id));
  }, [dispatch, id]);
  let content;
  if (isLoading) {
    content = (
      <>
        <Skeleton
          className={cls.avatar}
          width={200}
          height={200}
          border={"50%"}
        />
        <Skeleton className={cls.title} width={300} height={24} />
        <Skeleton className={cls.skeleton} width={300} height={24} />
        <Skeleton className={cls.skeleton} width={"100%"} height={200} />
        <Skeleton className={cls.skeleton} width={"100%"} height={200} />
      </>
    );
  } else if (error) {
    content = (
      <Text
        align={TextAlign.CENTER}
        theme={TextTheme.ERROR}
        title={t("There was an error loading the article")}
      />
    );
  } else {
    content = (
      <>
        <HStack justify="center" max className={cls.avatarWrapper}>
          <Avatar size={200} src={article?.img} className={cls.avatar} />
        </HStack>

        <VStack gap="4" max>
          <Text
            className={cls.title}
            title={article?.title}
            text={article?.subtitle}
            size={TextSize.L}
          />

          <HStack gap="8" className={cls.articleInfo}>
            <Icon
              width={20}
              height={20}
              className={cls.icon}
              Svg={EyeIcon}
            ></Icon>
            <Text text={String(article?.views)} />
          </HStack>
        </VStack>

        <HStack gap="8" className={cls.articleInfo}>
          <Icon
            width={20}
            height={20}
            className={cls.icon}
            Svg={CalendarIcon}
          ></Icon>
          <Text text={article?.createdAt} />
        </HStack>
        {article?.blocks.map(renderBlock)}
      </>
    );
  }

  return (
    <DynamicModuleLoader reducers={redusers} removeAfterUnmount>
      <VStack
        gap="16"
        className={classNames(cls.ArticleDetails, {}, [className])}
      >
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetails);
