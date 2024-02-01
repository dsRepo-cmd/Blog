import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { ArticleEdit } from "@/entities/Article";
import { ValidateArticleEditError } from "../consts/consts";
import { getArticleEditForm } from "../selectors/getArticleEdit";
import { validateArticleEditData } from "./validateArticleEditData";
import { ValidateArticleEditErrors } from "../type/articleEditSchema";

export const updateArticleEditData = createAsyncThunk<
  ArticleEdit,
  void,
  ThunkConfig<ValidateArticleEditErrors>
>("article/updateArticleEditData", async (_, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;

  const formData = getArticleEditForm(getState());

  console.log("updateArticleEditData==== formData", formData);

  const errors = validateArticleEditData(formData);

  if (Object.keys(errors).length > 0) {
    return rejectWithValue(errors);
  }

  try {
    const response = await extra.api.put<ArticleEdit>(
      "/article/" + formData?.id,
      formData
    );
    console.log("updateArticleEditData====", response.data);

    return response.data;
  } catch (e) {
    console.log(e);

    return rejectWithValue({ data: ValidateArticleEditError.SERVER_ERROR });
  }
});
