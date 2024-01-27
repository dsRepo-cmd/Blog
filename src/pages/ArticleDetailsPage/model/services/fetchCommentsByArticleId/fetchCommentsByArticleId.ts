import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Comment } from "@/entities/Comment";

export const fetchCommentsByArticleId = createAsyncThunk<
  Comment[],
  string | undefined,
  ThunkConfig<string>
>("articleDetails/fetchCommentsByArticleId", async (articleId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  if (!articleId) {
    return rejectWithValue("error articleId unknown");
  }

  try {
    const response = await extra.api.get<Comment[]>("/comments", {
      params: {
        articleId,
      },
    });

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e: unknown) {
    return rejectWithValue(e as string);
  }
});
