import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./ArticleDetailsPage.module.scss";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import DynamicModuleLoader, {
  ReducerList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import Page from "@/widgets/Page/ui/Page";
import { articleDetailsPageReducer } from "../../model/slices";
import { ArticleRecommendationsList } from "@/features/articleRecommendationsList";
import ArticleDetailsComments from "../ArticleDetailsComments/ArticleDetailsComments";
import { ArticleRating } from "@/features/articleRating";
import StickyContentLayout from "@/shared/layouts/StickyContentLayout/StickyContentLayout";
import { VStack } from "@/shared/ui/redesigned/Stack";
import DetailsContainer from "../DetailsContainer/DetailsContainer";
import AdditionalInfoContainer from "../AdditionalInfoContainer/AdditionalInfoContainer";

interface ArticleDetailsPageProps {
  className?: string;
}
const reducers: ReducerList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage: React.FC<ArticleDetailsPageProps> = ({
  className,
}) => {
  const { t } = useTranslation("article");
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
      <StickyContentLayout
        content={
          <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <VStack gap="16" max>
              <DetailsContainer />
              <ArticleRating articleId={id} />
              <ArticleRecommendationsList />
              <ArticleDetailsComments id={id} />
            </VStack>
          </Page>
        }
        right={<AdditionalInfoContainer />}
      />
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
