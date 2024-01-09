import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { User, userActions } from "@/entities/User";
import { validateAuthData } from "../validateAuthData/validateAuthData";
import { Session, ValidateAuthErrors } from "../../types/loginSchema";
import { ValidateAuthError } from "../../const/const";
import {
  TOKEN_LOCAL_STORAGE_KEY,
  USER_LOCAL_STORAGE_KEY,
} from "@/shared/const/localStorage";

interface loginByUsernameProps {
  email: string;
  password: string;
}

export const signInByEmail = createAsyncThunk<
  Session,
  loginByUsernameProps,
  ThunkConfig<ValidateAuthErrors>
>("login/loginByUsername", async (authData, thunkApi) => {
  const { extra, dispatch, rejectWithValue } = thunkApi;

  const errors = validateAuthData(authData);

  if (Object.keys(errors).length > 0) {
    return rejectWithValue(errors);
  }

  try {
    const response = await extra.api.post<Session>("/login", authData);

    if (!response.data) {
      throw new Error();
    }

    console.log(response.data);
    localStorage.setItem(
      USER_LOCAL_STORAGE_KEY,
      JSON.stringify(response.data.user.id)
    );
    localStorage.setItem(
      TOKEN_LOCAL_STORAGE_KEY,
      JSON.stringify(response.data.token)
    );

    dispatch(userActions.setAuthData(response.data.user));

    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue({ data: ValidateAuthError.SERVER_ERROR });
  }
});
