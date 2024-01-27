import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserEditSchema, UsersEdit } from "../types/usersEdit";
import { fetchUsersEditData } from "../services/fetchUsersEditData";
import { deleteUser } from "../services/deleteUser";

const initialState: UserEditSchema = {
  readonly: true,
  isLoading: false,
  error: undefined,
  data: undefined,
  validateErrors: undefined,
};

export const usersEditSlice = createSlice({
  name: "usersEdit",
  initialState,
  reducers: {
    setReadonly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload;
    },

    cancelUsersEdit: (state) => {
      state.readonly = true;
      state.form = state.data;
      state.validateErrors = undefined;
    },
    updateUsersEdit: (state, action: PayloadAction<UsersEdit[]>) => {
      if (action.payload) {
        state.form = [...action.payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersEditData.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchUsersEditData.fulfilled,
        (state, action: PayloadAction<UsersEdit[]>) => {
          state.isLoading = false;
          state.data = action.payload;
          state.form = action.payload;
        }
      )
      .addCase(fetchUsersEditData.rejected, (state, action) => {
        state.isLoading = false;
        state.validateErrors = action.payload;
      })

      .addCase(deleteUser.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        deleteUser.fulfilled,
        (state, action: PayloadAction<UsersEdit[]>) => {
          state.isLoading = false;
          state.data = action.payload;
          state.form = action.payload;
        }
      )
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.validateErrors = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { actions: usersEditActions } = usersEditSlice;
export const { reducer: usersEditReducer } = usersEditSlice;
