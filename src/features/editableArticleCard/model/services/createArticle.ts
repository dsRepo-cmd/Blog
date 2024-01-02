import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { ArticleEdit, ArticleType } from "@/entities/Article";
import {
  ValidateArticleEditError,
  ValidateArticleEditErrorType,
  ValidateArticleEditErrors,
} from "../consts/consts";
import { getCurrentDate } from "@/shared/lib/features";
import { getUserId } from "@/entities/User";
import { getArticleEditForm } from "../selectors/getArticleEdit";
import { validateArticleEditData } from "./validateArticleEditData";

export const createArticle = createAsyncThunk<
  ArticleEdit,
  string,
  ThunkConfig<ValidateArticleEditErrors[]>
>("article/updateArticleEditData", async (articleId, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;

  const userId = getUserId(getState());
  const newArticle: ArticleEdit = {
    id: articleId,
    title: "",
    subtitle: "",
    img: "",
    views: 0,
    createdAt: getCurrentDate(),
    userId,
    type: ArticleType.ALL,
    blocks: [],
  };

  const formData = getArticleEditForm(getState());

  const errors = validateArticleEditData(formData);

  if (errors.length) {
    return rejectWithValue(errors);
  }

  try {
    const response = await extra.api.post<ArticleEdit>(
      "/articles/",
      newArticle
    );

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue([
      {
        type: ValidateArticleEditErrorType.SERVER,
        error: ValidateArticleEditError.SERVER_ERROR,
      },
    ]);
  }
});
