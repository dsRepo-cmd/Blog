import { fetchProfileData } from "./model/services/fetchProfileData/fetchProfileData";
import { profileActions, profileReducer } from "./model/slice/ProfileSlice";
import { Profile, ProfileSchema } from "./model/types/profile";
import { ProfileCard } from "./ui/ProfileCard/ProfileCard";

export {
  Profile,
  ProfileSchema,
  profileReducer,
  profileActions,
  fetchProfileData,
  ProfileCard,
};
