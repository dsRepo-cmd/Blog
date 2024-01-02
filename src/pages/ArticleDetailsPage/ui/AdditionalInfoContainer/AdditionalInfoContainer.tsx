import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getArticleDetailsData } from "@/entities/Article";
import cls from "./AdditionalInfoContainer.module.scss";
import { getRouteArticleEdit } from "@/shared/const/router";
import Card from "@/shared/ui/redesigned/Card/Card";
import { ArticleAdditionalInfo } from "@/widgets/ArticleAdditionalInfo";

export const AdditionalInfoContainer = () => {
  const article = useSelector(getArticleDetailsData);

  const navigate = useNavigate();

  const onEditArticle = useCallback(() => {
    if (article) {
      navigate(getRouteArticleEdit(article.id));
    }
  }, [article, navigate]);

  if (!article) {
    return null;
  }

  return (
    <Card padding="12" border={"partial"} className={cls.card}>
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
