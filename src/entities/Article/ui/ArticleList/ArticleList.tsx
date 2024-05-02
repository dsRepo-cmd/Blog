import React, { memo, HTMLAttributeAnchorTarget } from "react";
import cls from "./ArticleList.module.scss";
import { useTranslation } from "react-i18next";
import ArticleListItem from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import { ArticleView } from "../../model/consts/consts";
import { Article } from "../../model/types/article";
import { classNames } from "@/shared/lib/classNames";
import { HStack } from "@/shared/ui/Stack";
import Text from "@/shared/ui/Text/Text";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  target?: HTMLAttributeAnchorTarget;
  view?: ArticleView;
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.DETAILS ? 12 : 3)
    .fill(0)
    .map((_, index) => (
      <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    ));

const ArticleList: React.FC<ArticleListProps> = ({
  className,
  articles,
  isLoading,
  view = ArticleView.DETAILS,
  target,
}) => {
  const { t } = useTranslation("article");

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Text size={"l"} title={t("Articles not found")} />
      </div>
    );
  }

  return (
    <HStack
      wrap="wrap"
      gap="16"
      className={classNames(cls.ArticleListRedesigned, {}, [])}
      data-testid="ArticleList"
    >
      {articles.map((item) => (
        <ArticleListItem
          article={item}
          view={view}
          target={target}
          key={item.id}
          className={cls.card}
        />
      ))}
      {isLoading && getSkeletons(view)}
    </HStack>
  );
};

export default memo(ArticleList);
