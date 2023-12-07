import React, { memo } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./ArticleEditPage.module.scss";
import { useTranslation } from "react-i18next";
import Page from "widgets/Page/Page";
import { useParams } from "react-router-dom";

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage: React.FC<ArticleEditPageProps> = ({ className }) => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  return (
    <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
      {isEdit ? `edit ${id}` : "Create"}
    </Page>
  );
};

export default memo(ArticleEditPage);
