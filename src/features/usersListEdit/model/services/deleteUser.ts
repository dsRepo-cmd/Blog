import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { UsersEdit, ValidateUserEditErrors } from "../types/usersEdit";
import { ValidateUserEditError } from "../consts/consts";

export const deleteUser = createAsyncThunk<
  UsersEdit[],
  string,
  ThunkConfig<ValidateUserEditErrors>
>("admin-panel/deleteUser", async (userId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.delete<UsersEdit[]>(
      `/users-edit/${userId}`
    );

    return response.data;
  } catch (e: unknown) {
    console.log(e);
    return rejectWithValue({ data: ValidateUserEditError.SERVER_ERROR });
  }
});
