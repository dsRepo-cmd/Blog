import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { classNames } from "@/shared/lib/classNames";
import { getArticleDetailsData } from "@/entities/Article";
import cls from "./AdditionalInfoContainer.module.scss";
import { getRouteArticleEdit } from "@/shared/const/router";
import Card from "@/shared/ui/redesigned/Card/Card";
import { ArticleAdditionalInfo } from "@/widgets/ArticleAdditionalInfo";
import Skeleton from "@/shared/ui/redesigned/Skeleton/Skeleton";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";

export const AdditionalInfoContainer = () => {
  const article = useSelector(getArticleDetailsData);

  const navigate = useNavigate();

  const onEditArticle = useCallback(() => {
    if (article) {
      navigate(getRouteArticleEdit(article.id));
    }
  }, [article, navigate]);

  if (!article) {
    return (
      <Card max padding="12" border={"partial"} className={cls.card}>
        <VStack
          max
          gap="32"
          className={classNames(cls.ArticleAdditionalInfo, {}, [])}
        >
          <HStack gap="8">
            <Skeleton width={32} height={32} border={"50%"} />
            <Skeleton width={120} height={32} />
          </HStack>
          <Skeleton width={"80%"} height={40} />
          <Skeleton width={"80%"} height={16} />
        </VStack>
      </Card>
    );
  }

  return (
    <Card max padding="12" border={"partial"} className={cls.card}>
      <ArticleAdditionalInfo
        onEdit={onEditArticle}
        author={article.user}
        createdAt={article.createdAt}
        views={article.views}
      />
    </Card>
  );
};

export default memo(AdditionalInfoContainer);
