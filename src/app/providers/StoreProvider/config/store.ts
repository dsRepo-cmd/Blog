import { ReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "entities/Counter";
import { StateSchema } from "./StateSchema";
import { userReducer } from "entities/User";
import { loginReducer } from "features/AuthByUsername";

export function createReduxStore(initialState?: StateSchema) {
  const rootRedusers: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    user: userReducer,
    loginForm: loginReducer,
  };

  return configureStore<StateSchema>({
    reducer: rootRedusers,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  });
}
