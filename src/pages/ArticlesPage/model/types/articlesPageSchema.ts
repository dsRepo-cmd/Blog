import { EntityState } from "@reduxjs/toolkit";
import { Article, ArticleSortField, ArticleView } from "entities/Article";
import { ArticleType } from "entities/Article/model/consts/consts";

import { SortOrder } from "shared/types";

export interface ArticlesPageSchema extends EntityState<Article> {
  isLoading?: boolean;
  error?: string;

  //pagination
  limit?: number;
  page: number;
  hasmore: boolean;
  //filters
  view: ArticleView;
  order: SortOrder;
  sort: ArticleSortField;
  search: string;
  type: ArticleType;

  _inited: boolean;
}
