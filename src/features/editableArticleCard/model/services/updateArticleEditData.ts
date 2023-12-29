import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { ArticleEdit } from "@/entities/Article";
import { ValidateArticleEditError } from "../consts/consts";
import { getArticleEditForm } from "../selectors/getArticleEdit";

export const updateArticleEditData = createAsyncThunk<
  ArticleEdit,
  void,
  ThunkConfig<ValidateArticleEditError[]>
>("article/updateArticleEditData", async (_, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;

  const formData = getArticleEditForm(getState());

  // const errors = validateArticleEditData(formData);

  // if (errors.length) {
  //   return rejectWithValue(errors);
  // }
  try {
    const response = await extra.api.put<ArticleEdit>(
      "/articles/" + formData?.id,
      formData
    );

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue([ValidateArticleEditError.SERVER_ERROR]);
  }
});
