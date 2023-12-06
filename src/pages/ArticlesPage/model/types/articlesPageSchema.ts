import { EntityState } from "@reduxjs/toolkit";
import { Article, ArticleView } from "entities/Article";

export interface ArticlesPageSchema extends EntityState<Article> {
  isLoading?: boolean;
  error?: string;

  view: ArticleView;

  //pagination
  limit?: number;
  page: number;
  hasmore: boolean;

  _inited: boolean;
}
