import React, { memo, useEffect } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./ArticleCreatePage.module.scss";
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

  const newId = Date.now().toString();

  useEffect(() => {
    dispatch(createArticle(newId));
  }, [dispatch]);

  return (
    <Page className={classNames(cls.ArticleCreatePage, {}, [className])}>
      <EditableArticleCard id={newId} create />
    </Page>
  );
};

export default memo(ArticleCreatePage);
