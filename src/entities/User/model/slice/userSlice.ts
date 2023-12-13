import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, UserSchema } from "../types/user";
import { USER_LOCAL_STORAGE_KEY } from "@/shared/const/localStorage";
import { setFeatureFlags } from "@/shared/lib/features/setGetFeatures";
import { saveJsonSettings } from "../services/saveJsonSettings";
import { JsonSettings } from "../types/jsonSettings";

const initialState: UserSchema = {
  _inited: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
      setFeatureFlags(action.payload.features);
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
      if (user) {
        const json = JSON.parse(user) as User;
        state.authData = json;
        setFeatureFlags(json.features);
      }
      state._inited = true;
    },

    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
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
  },
});

// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
