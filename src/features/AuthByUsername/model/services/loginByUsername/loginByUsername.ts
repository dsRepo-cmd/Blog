import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";

import { User, userActions } from "@/entities/User";

import i18n from "@/shared/config/i18n/i18n";
import { USER_LOCAL_STORAGE_KEY } from "@/shared/const/localStorage";

interface loginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  loginByUsernameProps,
  ThunkConfig<string>
>("login/loginByUsername", async (authData, thunkApi) => {
  const { extra, dispatch, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.post<User>("/login", authData);

    if (!response.data) {
      throw new Error();
    }

    // localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(response.data));

    dispatch(userActions.setAuthData(response.data));

    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(i18n.t("Wrong nickname or password"));
  }
});
