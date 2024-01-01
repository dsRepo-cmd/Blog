import React, { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames";
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { getCanEditArticle } from "../../model/selectors/article";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { getArticleDetailsData } from "@/entities/Article";
import { getRouteArticleEdit, getRouteArticles } from "@/shared/const/router";
import Button from "@/shared/ui/redesigned/Button/Button";

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

const ArticleDetailsPageHeader: React.FC<ArticleDetailsPageHeaderProps> = ({
  className,
}) => {
  const { t } = useTranslation("article");
  const navigate = useNavigate();
  const canEdit = useSelector(getCanEditArticle);
  const article = useSelector(getArticleDetailsData);

  const onBackToList = useCallback(() => {
    navigate(getRouteArticles());
  }, [navigate]);

  const onEditArticle = useCallback(() => {
    if (article) {
      navigate(getRouteArticleEdit(article.id));
    }
  }, [article, navigate]);

  return (
    <HStack
      justify="between"
      gap="8"
      className={classNames("", {}, [className])}
    >
      <Button variant={"outline"} onClick={onBackToList}>
        {t("Back to list")}
      </Button>
      {canEdit && (
        <Button variant={"outline"} onClick={onEditArticle}>
          {t("Edit")}
        </Button>
      )}
    </HStack>
  );
};

export default memo(ArticleDetailsPageHeader);
