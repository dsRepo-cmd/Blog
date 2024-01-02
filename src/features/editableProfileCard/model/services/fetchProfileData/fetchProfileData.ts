import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Profile } from "@/entities/Profile";
import { ValidateProfileErrors } from "../../types/editableProfileCardSchema";
import { ValidateProfileError } from "../../consts/consts";

export const fetchProfileData = createAsyncThunk<
  Profile,
  string,
  ThunkConfig<ValidateProfileErrors>
>("profile/fetchProfileData", async (profileId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<Profile>("/profile/" + profileId);

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue({ data: ValidateProfileError.SERVER_ERROR });
  }
});
