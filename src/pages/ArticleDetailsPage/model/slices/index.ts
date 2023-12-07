import { combineReducers } from "@reduxjs/toolkit";

import { articleDetailsPageRecommendationsReducer } from "./articleDetailsPageRecommendationsSlice";
import { articleDetailsCommentsReducer } from "./articleDetailsCommentsSlice";
import { ArticleDetailsPageSchema } from "../types/insex";

export const articleDetailsPageReducer =
  combineReducers<ArticleDetailsPageSchema>({
    recommendations: articleDetailsPageRecommendationsReducer,
    comments: articleDetailsCommentsReducer,
  });
