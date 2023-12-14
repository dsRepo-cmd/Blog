import { classNames } from "@/shared/lib/classNames";
import { useTranslation } from "react-i18next";
import cls from "./ArticleRecommendationsList.module.scss";
import React, { memo } from "react";
import Text, { TextSize } from "@/shared/ui/deprecated/Text/Text";

import { VStack } from "@/shared/ui/redesigned/Stack";
import { ArticleList, ArticleView } from "@/entities/Article";
import { useArticleRecomendationsList } from "../../api/aritcleRecommendationsApi";

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
