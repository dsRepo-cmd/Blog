import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoginSchema } from "../types/loginSchema";
import { loginByEmail } from "../services/loginByEmail/loginByEmail";

const initialState: LoginSchema = {
  username: "",
  email: "",
  password: "",
  isLoading: false,
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
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginByEmail.pending, (state) => {
        state.validateErrors = undefined;
        state.isLoading = true;
      })
      .addCase(loginByEmail.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(loginByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.validateErrors = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { actions: loginActions } = loginSlise;
export const { reducer: loginReducer } = loginSlise;
