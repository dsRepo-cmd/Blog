import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { ArticleEdit } from "@/entities/Article";

import { getUserId } from "@/entities/User";

import { ValidateArticleEditErrors } from "../type/articleEditSchema";
import { ValidateArticleEditError } from "../consts/consts";

export const createArticle = createAsyncThunk<
  ArticleEdit,
  void,
  ThunkConfig<ValidateArticleEditErrors>
>("article/createArticle", async (_, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;

  const userId = getUserId(getState());

  try {
    const response = await extra.api.post<ArticleEdit>("/article/", { userId });

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue({ data: ValidateArticleEditError.SERVER_ERROR });
  }
});
