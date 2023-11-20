import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User, userActions } from "entities/User";
import i18n from "shared/config/i18n/i18n";
import { USER_LOCAL_STORAGE_KEY } from "shared/const/localStorage";

interface loginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  loginByUsernameProps,
  { rejectValue: string }
>("login/loginByUsername", async (authData, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:8000/login", authData);

    if (!response.data) {
      throw new Error();
    }

    localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(response.data));
    thunkAPI.dispatch(userActions.SetAuthData(response.data));
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(i18n.t("Wrong nickname or password"));
  }
});
