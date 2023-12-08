import { StoreProvider } from "./ui/StoreProvider";
import { createReduxStore, AppDispatch } from "./config/store";
import type {
  StateSchema,
  ReduxStoreWithManager,
  ThunkConfig,
} from "./config/StateSchema";
import { UserRole } from "entities/User/model/types/user";
import {
  isUserAdmin,
  isUserManager,
} from "entities/User/model/selectors/roleSelectors";

export {
  StoreProvider,
  createReduxStore,
  StateSchema,
  ReduxStoreWithManager,
  AppDispatch,
  ThunkConfig,
  UserRole,
  isUserAdmin,
  isUserManager,
};
