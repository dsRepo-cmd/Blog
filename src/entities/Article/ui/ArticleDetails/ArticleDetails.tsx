import React, { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames";
import DynamicModuleLoader, {
  ReducerList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import TextDeprecated, {
  TextAlign,
  TextSize,
} from "@/shared/ui/deprecated/Text/Text";
import SkeletonDeprecated from "@/shared/ui/deprecated/Skeleton/Skeleton";
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

import cls from "./ArticleDetails.module.scss";
import { Icon } from "@/shared/ui/deprecated/Icon/Icon";
import Avatar from "@/shared/ui/deprecated/Avatar/Avatar";
import { renderArticleBlock } from "./renderBlock";
import Text from "@/shared/ui/redesigned/Text/Text";
import AppImage from "@/shared/ui/redesigned/AppImage/AppImage";
import { ToggleFeatures } from "@/shared/lib/features";
import Skeleton from "@/shared/ui/redesigned/Skeleton/Skeleton";

interface ArticleDetailsProps {
  className?: string;
  id: string;
}
const redusers: ReducerList = {
  articleDetails: articleDetailsReducer,
};

const Deprecated = () => {
  const article = useSelector(getArticleDetailsData);
  return (
    <>
      <HStack justify="center" max className={cls.avatarWrapper}>
        <Avatar size={200} src={article?.img} className={cls.avatar} />
      </HStack>
      <VStack gap="4" max data-testid="ArticleDetails.Info">
        <TextDeprecated
          className={cls.title}
          title={article?.title}
          text={article?.subtitle}
          size={TextSize.L}
        />
        <HStack gap="8" className={cls.articleInfo}>
          <Icon className={cls.icon} Svg={EyeIcon} />
          <TextDeprecated text={String(article?.views)} />
        </HStack>
        <HStack gap="8" className={cls.articleInfo}>
          <Icon className={cls.icon} Svg={CalendarIcon} />
          <TextDeprecated text={article?.createdAt} />
        </HStack>
      </VStack>
      {article?.blocks.map(renderArticleBlock)}
    </>
  );
};

const Redesigned = () => {
  const article = useSelector(getArticleDetailsData);

  return (
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
};

const ArticleDetails: React.FC<ArticleDetailsProps> = ({ className, id }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);

  useEffect(() => {
    if (__PROJECT__ !== "storybook") {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = (
      <>
        <SkeletonDeprecated
          className={cls.avatar}
          width={200}
          height={200}
          border="50%"
        />
        <SkeletonDeprecated className={cls.title} width={300} height={32} />
        <SkeletonDeprecated className={cls.skeleton} width={600} height={24} />
        <SkeletonDeprecated
          className={cls.skeleton}
          width="100%"
          height={200}
        />
        <SkeletonDeprecated
          className={cls.skeleton}
          width="100%"
          height={200}
        />
      </>
    );
  } else if (error) {
    content = (
      <TextDeprecated
        align={TextAlign.CENTER}
        title={t("An error occurred while loading the article")}
      />
    );
  } else {
    content = (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<Redesigned />}
        off={<Deprecated />}
      />
    );
  }

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
