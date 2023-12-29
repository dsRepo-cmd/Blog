import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./ArticleEditPage.module.scss";
import { useTranslation } from "react-i18next";

import { useParams } from "react-router-dom";
import { Page } from "@/widgets/Page";
import { EditableArticleCard } from "@/features/editableArticleCard";

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage: React.FC<ArticleEditPageProps> = ({ className }) => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  if (!id) {
    return null;
  }

  return (
    <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
      <EditableArticleCard id={id} />
    </Page>
  );
};

export default memo(ArticleEditPage);
