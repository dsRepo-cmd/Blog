import React, { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames";
import { useTranslation } from "react-i18next";
import Button, { ButtonTheme } from "@/shared/ui/Button/Button";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { getCanEditArticle } from "../../model/selectors/article";
import { HStack } from "@/shared/ui/Stack";
import { getArticleDetailsData } from "@/entities/Article";
import { RoutePath } from "@/shared/const/router";

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

const ArticleDetailsPageHeader: React.FC<ArticleDetailsPageHeaderProps> = ({
  className,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const canEdit = useSelector(getCanEditArticle);
  const article = useSelector(getArticleDetailsData);

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  const onEditArticle = useCallback(() => {
    navigate(`${RoutePath.article_details}${article?.id}/edit`);
  }, [article?.id, navigate]);

  return (
    <HStack
      justify="between"
      gap="8"
      className={classNames("", {}, [className])}
    >
      <Button theme={ButtonTheme.OUTLINE_INVERTED} onClick={onBackToList}>
        {t("Back to list")}
      </Button>
      {canEdit && (
        <Button theme={ButtonTheme.OUTLINE_INVERTED} onClick={onEditArticle}>
          {t("Edit")}
        </Button>
      )}
    </HStack>
  );
};

export default memo(ArticleDetailsPageHeader);
