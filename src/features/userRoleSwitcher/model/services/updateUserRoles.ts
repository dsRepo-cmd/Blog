import { ThunkConfig } from "@/app/providers/StoreProvider";
import { UserRole } from "@/entities/User";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserRolesMutation } from "../../api/userRoleApi";

interface UpdateUserRolesOptions {
  userId: string;
  newRoles: UserRole[];
}

export const updateUserRoles = createAsyncThunk<
  void,
  UpdateUserRolesOptions,
  ThunkConfig<string>
>("features/updateUserRoles", async ({ userId, newRoles }, thunkApi) => {
  const { rejectWithValue, dispatch } = thunkApi;

  try {
    console.log("userId", userId, "newRoles", newRoles);
    await dispatch(
      updateUserRolesMutation({
        userId,
        roles: newRoles,
      })
    );

    window.location.reload();
    return undefined;
  } catch (e: unknown) {
    return rejectWithValue(e as string);
  }
});
