import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";

import { ArticleEdit } from "@/entities/Article";

export const fetchArticleEditData = createAsyncThunk<
  ArticleEdit,
  string,
  ThunkConfig<string>
>("articleEdit/fetchArticleEditData", async (articleId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<ArticleEdit>(
      `/articles/${articleId}`,
      {
        params: {
          _expand: "user",
        },
      }
    );

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("Error");
  }
});
