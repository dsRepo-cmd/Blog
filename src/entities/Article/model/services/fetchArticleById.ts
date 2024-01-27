import { createAsyncThunk } from "@reduxjs/toolkit";
import { Article } from "../types/article";
import { ThunkConfig } from "@/app/providers/StoreProvider";

export const fetchArticleById = createAsyncThunk<
  Article,
  string,
  ThunkConfig<string>
>("articleDetails/fetchArticleById", async (articleId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<Article>(`/article/${articleId}`, {
      params: {
        _expand: "user",
      },
    });

    if (!response.data) {
      throw new Error("error article details data");
    }

    return response.data;
  } catch (e: unknown) {
    return rejectWithValue(e as string);
  }
});
