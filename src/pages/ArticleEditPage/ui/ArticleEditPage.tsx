import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./ArticleEditPage.module.scss";

import { useParams } from "react-router-dom";
import { Page } from "@/widgets/Page";
import { EditableArticleCard } from "@/features/editableArticleCard";

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage: React.FC<ArticleEditPageProps> = ({ className }) => {
  return (
    <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
      <EditableArticleCard />
    </Page>
  );
};

export default memo(ArticleEditPage);
