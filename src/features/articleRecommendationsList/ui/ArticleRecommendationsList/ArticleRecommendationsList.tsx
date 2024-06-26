import { classNames } from "@/shared/lib/classNames";
import { useTranslation } from "react-i18next";
import React, { memo } from "react";
import { VStack } from "@/shared/ui/Stack";
import { ArticleList } from "@/entities/Article";
import { useArticleRecomendationsList } from "../../api/aritcleRecommendationsApi";
import Text from "@/shared/ui/Text/Text";
import { isMobile } from "react-device-detect";

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList: React.FC<
  ArticleRecommendationsListProps
> = ({ className }) => {
  const { t } = useTranslation("article");
  const { isLoading, data: articles, error } = useArticleRecomendationsList(3);

  if (isLoading || error || !articles) {
    return null;
  }

  if (isMobile) {
    return (
      <VStack
        data-testid="ArticleRecommendationsList"
        gap="8"
        className={classNames("", {}, [className])}
      >
        <Text size="l" title={t("We recommend")} />
        <VStack padding="24">
          <ArticleList articles={articles} target="_blank" />
        </VStack>
      </VStack>
    );
  }

  return (
    <VStack
      data-testid="ArticleRecommendationsList"
      gap="8"
      max
      className={classNames("", {}, [className])}
    >
      <Text size="l" title={t("We recommend")} />
      <ArticleList articles={articles} target="_blank" />
    </VStack>
  );
};
export default memo(ArticleRecommendationsList);
