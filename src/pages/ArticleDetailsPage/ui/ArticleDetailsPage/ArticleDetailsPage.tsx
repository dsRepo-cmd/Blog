import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./ArticleDetailsPage.module.scss";
import { useTranslation } from "react-i18next";
import { ArticleDetails } from "@/entities/Article";
import { useParams } from "react-router-dom";
import DynamicModuleLoader, {
  ReducerList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import Page from "@/widgets/Page/ui/Page";
import { articleDetailsPageReducer } from "../../model/slices";
import ArticleDetailsPageHeader from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader";
import { ArticleRecommendationsList } from "@/features/articleRecommendationsList";
import ArticleDetailsComments from "../ArticleDetailsComments/ArticleDetailsComments";
import { ArticleRating } from "@/features/articleRating";
import { getFeatureFlag } from "@/shared/lib/features/setGetFeatures";
import { ToggleFeatures } from "@/shared/lib/features/ToggleFeatures/ToggleFeatures";
import Card from "@/shared/ui/deprecated/Card/Card";

interface ArticleDetailsPageProps {
  className?: string;
}
const reducers: ReducerList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage: React.FC<ArticleDetailsPageProps> = ({
  className,
}) => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t("Article not found")}
      </div>
    );
  }
  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <ArticleDetailsPageHeader />
        <ArticleDetails id={id} />
        <ToggleFeatures
          off={<Card>{t("Article ratings coming soon!")}</Card>}
          feature={"isArticleRatingEnabled"}
          on={<ArticleRating articleId={id} />}
        />
        <ArticleRecommendationsList />
        <ArticleDetailsComments id={id} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
