import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, UserSchema } from "../types/user";
import {
  LOCAL_STORAGE_LAST_DESIGN_KEY,
  TOKEN_LOCAL_STORAGE_KEY,
  USER_LOCAL_STORAGE_KEY,
} from "@/shared/const/localStorage";

import { saveJsonSettings } from "../services/saveJsonSettings";
import { JsonSettings } from "../types/jsonSettings";
import { initAuthData } from "../services/initAuthData";
import { setFeatureFlags } from "@/shared/lib/features";

const initialState: UserSchema = {
  _inited: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthData: (state, { payload }: PayloadAction<User>) => {
      state.authData = payload;
      setFeatureFlags(payload.features);

      localStorage.setItem(USER_LOCAL_STORAGE_KEY, payload.id);
      localStorage.setItem(
        LOCAL_STORAGE_LAST_DESIGN_KEY,
        payload.features?.isAppRedesigned ? "new" : "old"
      );
    },

    setSignUpData: (state, { payload }: PayloadAction<User>) => {
      state.authData = payload;

      setFeatureFlags(payload.features);
      localStorage.setItem(USER_LOCAL_STORAGE_KEY, payload.id);

      localStorage.setItem(
        LOCAL_STORAGE_LAST_DESIGN_KEY,
        payload.features?.isAppRedesigned ? "new" : "old"
      );
    },

    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
      localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      saveJsonSettings.fulfilled,
      (state, { payload }: PayloadAction<JsonSettings>) => {
        if (state.authData) {
          state.authData.jsonSettings = payload;
        }
      }
    );
    builder.addCase(
      initAuthData.fulfilled,
      (state, { payload }: PayloadAction<User>) => {
        state.authData = payload;
        setFeatureFlags(payload.features);
        state._inited = true;
      }
    );
    builder.addCase(initAuthData.rejected, (state) => {
      state._inited = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
