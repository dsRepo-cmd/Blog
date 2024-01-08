import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { User, userActions } from "@/entities/User";

import { LoginSchema, ValidateAuthErrors } from "../../types/loginSchema";
import { ValidateAuthError } from "../../const/const";
import { validateCodeConfirmData } from "../validateCodeConfirmData/validateCodeConfirmData";
import { loginActions } from "../../slice/loginSlise";

interface confirmCodeProps {
  email: string;
  code: string;
  token: string;
}

export const confirmCode = createAsyncThunk<
  User,
  confirmCodeProps,
  ThunkConfig<ValidateAuthErrors>
>("signUp/confirmCode", async (authData, thunkApi) => {
  const { extra, dispatch, rejectWithValue } = thunkApi;

  console.log("confirmCode", authData);
  const errors = validateCodeConfirmData(authData);

  if (Object.keys(errors).length > 0) {
    return rejectWithValue(errors);
  }

  try {
    const response = await extra.api.post<User>("signup-confirm", authData);

    if (!response.data) {
      throw new Error();
    }

    console.log(response);

    dispatch(userActions.setAuthData(response.data));

    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue({ data: ValidateAuthError.SERVER_ERROR });
  }
});
