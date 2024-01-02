import {
  getUserAuthData,
  getUserId,
} from "./model/selectors/getUserAuthData/getUserAuthData";
import { getUserInited } from "./model/selectors/getUserInited/getUserInited";
import {
  getUserRoles,
  isUserAdmin,
  isUserManager,
} from "./model/selectors/roleSelectors";
import { userActions, userReducer } from "./model/slice/userSlice";
import { UserSchema, User } from "./model/types/user";
import { UserRole } from "./model/consts/consts";
import { useJsonSettings } from "./model/selectors/jsonSettings";
import { saveJsonSettings } from "./model/services/saveJsonSettings";
import { initAuthData } from "./model/services/initAuthData";

export {
  userReducer,
  getUserAuthData,
  getUserInited,
  getUserRoles,
  UserRole,
  userActions,
  isUserAdmin,
  isUserManager,
  useJsonSettings,
  saveJsonSettings,
  initAuthData,
  getUserId,
};

export type { UserSchema, User };
