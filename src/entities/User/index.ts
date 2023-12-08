import { getUserAuthData } from "./model/selectors/getUserAuthData/getUserAuthData";
import { getUserInited } from "./model/selectors/getUserInited/getUserInited";
import {
  getUserRoles,
  isUserAdmin,
  isUserManager,
} from "./model/selectors/roleSelectors";
import { userActions, userReducer } from "./model/slice/userSlice";
import { UserSchema, User } from "./model/types/user";
import { UserRole } from "./model/consts/consts";

export {
  userReducer,
  getUserAuthData,
  getUserInited,
  getUserRoles,
  UserRole,
  userActions,
  isUserAdmin,
  isUserManager,
};

export type { UserSchema, User };
