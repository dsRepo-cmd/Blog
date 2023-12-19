import React, { memo, HTMLAttributeAnchorTarget } from "react";
import { Article } from "../../model/types/article";
import { ArticleView } from "../../model/consts/consts";
import ArticleListItemRedesigned from "./ArticleListItemRedesigned/ArticleListItemRedesigned";

export interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const ArticleListItem: React.FC<ArticleListItemProps> = (props) => {
  return <ArticleListItemRedesigned {...props} />;
};

export default memo(ArticleListItem);
