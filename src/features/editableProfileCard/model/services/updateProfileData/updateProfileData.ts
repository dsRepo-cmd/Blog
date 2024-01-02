import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";

import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm";

import { validateProfileData } from "@/features/editableProfileCard/model/services/validateProfileData/validateProfileData";
import { Profile } from "@/entities/Profile";
import { ValidateProfileErrors } from "../../types/editableProfileCardSchema";
import {
  ValidateProfileError,
  ValidateProfileErrorType,
} from "../../consts/consts";

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<ValidateProfileErrors[]>
>("profile/updateProfileData", async (_, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;

  const formData = getProfileForm(getState());

  const errors = validateProfileData(formData);

  if (errors.length) {
    return rejectWithValue(errors);
  }
  try {
    const response = await extra.api.put<Profile>(
      "/profile/" + formData?.id,
      formData
    );

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue([
      {
        type: ValidateProfileErrorType.DATA,
        error: ValidateProfileError.SERVER_ERROR,
      },
    ]);
  }
});
