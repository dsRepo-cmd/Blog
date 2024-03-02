import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import { Page } from "@/widgets/Page";
import { EditableArticleCard } from "@/features/editableArticleCard";

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage: React.FC<ArticleEditPageProps> = ({ className }) => {
  return (
    <Page className={classNames("", {}, [className])}>
      <EditableArticleCard />
    </Page>
  );
};

export default memo(ArticleEditPage);
