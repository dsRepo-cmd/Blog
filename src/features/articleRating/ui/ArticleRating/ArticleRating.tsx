import React, { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Rating, RatingCard } from "@/entities/Rating";
import {
  useGetArticleRating,
  useRateArticle,
} from "../../api/ArticleRatingApi";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import Skeleton from "@/shared/ui/redesigned/Skeleton/Skeleton";

export interface ArticleRatingProps {
  className?: string;
  articleId: string;
}

const ArticleRating: React.FC<ArticleRatingProps> = ({
  className,
  articleId,
}) => {
  const { t } = useTranslation("article");
  const userData = useSelector(getUserAuthData);
  const { data, isLoading } = useGetArticleRating({
    articleId,
    userId: userData?.id ?? "",
  });

  const [rateArticleMutation] = useRateArticle();

  const handleRateArticle = useCallback(
    (starsCount: number, feedback?: string) => {
      try {
        rateArticleMutation({
          userId: userData?.id ?? "",
          articleId,
          rate: starsCount,
          feedback,
        });
      } catch (e) {
        // handle error
        console.log(e);
      }
    },
    [articleId, rateArticleMutation, userData?.id]
  );

  const onAccept = useCallback(
    (starsCount: number, feedback?: string) => {
      handleRateArticle(starsCount, feedback);
    },
    [handleRateArticle]
  );

  const onCancel = useCallback(
    (starsCount: number) => {
      handleRateArticle(starsCount);
    },
    [handleRateArticle]
  );

  const rating = function calculateAverageRate(data: Rating[]): number {
    const isUserRate = data.filter((rating) => rating.userId === userData?.id);

    if (data.length === 0 || isUserRate.length === 0) {
      return 0;
    }

    const totalRate = data.reduce((sum, feedback) => sum + feedback.rate, 0);
    const averageRate = totalRate / data.length;
    return Math.round(averageRate);
  };

  if (isLoading) {
    return <Skeleton width={"100%"} height={140} />;
  }
  return (
    <RatingCard
      onCancel={onCancel}
      onAccept={onAccept}
      rate={data && rating(data)}
      title={t("Rate the article")}
      feedbackTitle={t("Leave a review about the article")}
      hasFeedback
    />
  );
};

export default memo(ArticleRating);
