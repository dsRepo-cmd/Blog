import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { User, userActions } from "@/entities/User";
import i18n from "@/shared/config/i18n/i18n";
import { validateAuthData } from "../validateAuthData/validateAuthData";
import { ValidateAuthErrors } from "../../types/loginSchema";
import { ValidateAuthError, ValidateAuthErrorType } from "../../const/const";

interface loginByUsernameProps {
  email: string;
  password: string;
}

export const loginByEmail = createAsyncThunk<
  User,
  loginByUsernameProps,
  ThunkConfig<ValidateAuthErrors[]>
>("login/loginByUsername", async (authData, thunkApi) => {
  const { extra, dispatch, rejectWithValue } = thunkApi;

  const errors = validateAuthData(authData);

  if (errors.length) {
    return rejectWithValue(errors);
  }

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
    return rejectWithValue([
      {
        type: ValidateAuthErrorType.DATA,
        error: ValidateAuthError.SERVER_ERROR,
      },
    ]);
  }
});
