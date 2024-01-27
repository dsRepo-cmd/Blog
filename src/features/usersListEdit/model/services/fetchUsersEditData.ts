import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { UsersEdit, ValidateUserEditErrors } from "../types/usersEdit";
import { ValidateUserEditError } from "../consts/consts";

export const fetchUsersEditData = createAsyncThunk<
  UsersEdit[],
  void,
  ThunkConfig<ValidateUserEditErrors>
>("admin-panel/fetchUsersEditData", async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<UsersEdit[]>("/users-edit/");

    return response.data;
  } catch (e: unknown) {
    console.log(e);
    return rejectWithValue({ data: ValidateUserEditError.SERVER_ERROR });
  }
});
