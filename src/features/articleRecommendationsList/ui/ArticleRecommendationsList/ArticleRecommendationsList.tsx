import { classNames } from "shared/lib/classNames";
import { useTranslation } from "react-i18next";
import cls from "./ArticleRecommendationsList.module.scss";
import React, { memo } from "react";
import Text, { TextSize } from "shared/ui/Text/Text";
import ArticleList from "entities/Article/ui/ArticleList/ArticleList";
import { VStack } from "shared/ui/Stack";
import { ArticleView } from "entities/Article";
import { useArticleRecomendationsList } from "features/articleRecommendationsList/api/aritcleRecommendationsApi";

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList: React.FC<
  ArticleRecommendationsListProps
> = ({ className }) => {
  const { t } = useTranslation();
  const { isLoading, data: articles, error } = useArticleRecomendationsList(3);

  if (isLoading || error || !articles) {
    return null;
  }

  return (
    <VStack
      gap="8"
      className={classNames(cls.ArticleRecommendationsList, {}, [className])}
    >
      <Text size={TextSize.M} title={t("Recommendations")} />
      <ArticleList
        view={ArticleView.DETAILS}
        target="_blank"
        articles={articles}
      />
    </VStack>
  );
};
export default memo(ArticleRecommendationsList);
