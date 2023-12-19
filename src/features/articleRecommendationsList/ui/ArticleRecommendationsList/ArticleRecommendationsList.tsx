import { classNames } from "@/shared/lib/classNames";
import { useTranslation } from "react-i18next";
import React, { memo } from "react";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { ArticleList } from "@/entities/Article";
import { useArticleRecomendationsList } from "../../api/aritcleRecommendationsApi";
import Text from "@/shared/ui/redesigned/Text/Text";

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
      data-testid="ArticleRecommendationsList"
      gap="8"
      className={classNames("", {}, [className])}
    >
      <Text size="l" title={t("We recommend")} />
      <ArticleList articles={articles} target="_blank" />
    </VStack>
  );
};
export default memo(ArticleRecommendationsList);
