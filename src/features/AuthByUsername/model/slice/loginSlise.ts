import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoginSchema } from "../types/loginSchema";
import { signInByEmail } from "../services/signInByEmail/signInByEmail";
import { signUpByEmail } from "../services/signUpByEmail/signUpByEmail";

import { confirmCode } from "../services/confirmCode/confirmCode";
import { TOKEN_LOCAL_STORAGE_KEY } from "@/shared/const/localStorage";

const initialState: LoginSchema = {
  id: "",
  confirmCode: "",
  username: "",
  email: "",
  password: "",
  code: "",
  isLoading: false,
  isConfirm: false,
  token: "",
};

export const loginSlise = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signInByEmail.pending, (state) => {
        state.validateErrors = undefined;
        state.isLoading = true;
      })
      .addCase(signInByEmail.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(signInByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.validateErrors = action.payload;
      })

      .addCase(signUpByEmail.pending, (state) => {
        state.validateErrors = undefined;
        state.isLoading = true;
      })
      .addCase(signUpByEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.code) state.confirmCode = action.payload.code;
        if (action.payload.token) {
          state.token = action.payload.token;
          localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, action.payload.token);
        }
      })
      .addCase(signUpByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.validateErrors = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { actions: loginActions } = loginSlise;
export const { reducer: loginReducer } = loginSlise;
