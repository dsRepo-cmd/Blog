import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { User } from "@/entities/User";
import { validateAuthData } from "../validateAuthData/validateAuthData";
import { LoginSchema, ValidateAuthErrors } from "../../types/loginSchema";
import { ValidateAuthError } from "../../const/const";
import { USER_LOCAL_STORAGE_KEY } from "@/shared/const/localStorage";

interface signUpByEmailProps {
  email: string;
  password: string;
}

export const signUpByEmail = createAsyncThunk<
  LoginSchema,
  signUpByEmailProps,
  ThunkConfig<ValidateAuthErrors>
>("signUp/signUpByEmail", async (authData, thunkApi) => {
  const { extra, dispatch, rejectWithValue } = thunkApi;

  const errors = validateAuthData(authData);

  if (Object.keys(errors).length > 0) {
    return rejectWithValue(errors);
  }

  try {
    const response = await extra.api.post<LoginSchema>("/signup", authData);

    console.log(response);
    if (!response.data) {
      throw new Error();
    }

    console.log(response.data);
    localStorage.setItem(
      USER_LOCAL_STORAGE_KEY,
      JSON.stringify(response.data.id)
    );

    // dispatch(userActions.setAuthData(response.data));
    // dispatch(userActions.setAuthData(response.data));

    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue({ data: ValidateAuthError.SERVER_ERROR });
  }
});
