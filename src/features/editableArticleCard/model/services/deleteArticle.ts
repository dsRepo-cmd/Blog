import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { ArticleEdit } from "@/entities/Article";

import { ValidateArticleEditErrors } from "../type/articleEditSchema";
import { ValidateArticleEditError } from "../consts/consts";

export const deleteArticle = createAsyncThunk<
  ArticleEdit,
  string,
  ThunkConfig<ValidateArticleEditErrors>
>("article/deleteArticle", async (articleId, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;

  try {
    const response = await extra.api.delete<ArticleEdit>(
      "/article/" + articleId
    );

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue({ data: ValidateArticleEditError.SERVER_ERROR });
  }
});
