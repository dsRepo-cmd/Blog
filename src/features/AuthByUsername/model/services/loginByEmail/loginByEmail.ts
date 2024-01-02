import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { User, userActions } from "@/entities/User";
import { validateAuthData } from "../validateAuthData/validateAuthData";
import { ValidateAuthErrors } from "../../types/loginSchema";
import { ValidateAuthError } from "../../const/const";

interface loginByUsernameProps {
  email: string;
  password: string;
}

export const loginByEmail = createAsyncThunk<
  User,
  loginByUsernameProps,
  ThunkConfig<ValidateAuthErrors>
>("login/loginByUsername", async (authData, thunkApi) => {
  const { extra, dispatch, rejectWithValue } = thunkApi;

  const errors = validateAuthData(authData);

  if (Object.keys(errors).length > 0) {
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
    return rejectWithValue({ data: ValidateAuthError.SERVER_ERROR });
  }
});
