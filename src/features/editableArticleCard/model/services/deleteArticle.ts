import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { ArticleEdit } from "@/entities/Article";
import { ValidateArticleEditError } from "../consts/consts";

export const deleteArticle = createAsyncThunk<
  ArticleEdit,
  string,
  ThunkConfig<ValidateArticleEditError[]>
>("article/updateArticleEditData", async (articleId, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;

  // const errors = validateArticleEditData(formData);

  // if (errors.length) {
  //   return rejectWithValue(errors);
  // }
  try {
    const response = await extra.api.delete<ArticleEdit>(
      "/articles/" + articleId
    );

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue([ValidateArticleEditError.SERVER_ERROR]);
  }
});
