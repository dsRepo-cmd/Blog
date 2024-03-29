import React, { memo, useEffect } from "react";
import { classNames } from "@/shared/lib/classNames";
import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page";
import {
  EditableArticleCard,
  createArticle,
} from "@/features/editableArticleCard";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";

interface ArticleCreatePageProps {
  className?: string;
}

const ArticleCreatePage: React.FC<ArticleCreatePageProps> = ({ className }) => {
  const { t } = useTranslation("article");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(createArticle());
  }, [dispatch]);

  return (
    <Page className={classNames("", {}, [className])}>
      <EditableArticleCard create />
    </Page>
  );
};

export default memo(ArticleCreatePage);
