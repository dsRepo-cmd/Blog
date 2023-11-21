import { Reducer } from "@reduxjs/toolkit";
import { ReduxStoreWithManager } from "app/providers/StoreProvider";
import { StateSchemaKey } from "app/providers/StoreProvider/config/StateSchema";
import { type } from "os";

import React, { ReactNode, useEffect } from "react";
import { useDispatch, useStore } from "react-redux";

export type ReducerList = {
  [name in StateSchemaKey]?: Reducer;
};

type ReducerListEntry = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps {
  children: ReactNode;

  reducers: ReducerList;
  removeAfterUnmount?: boolean;
}

const DynamicModuleLoader: React.FC<DynamicModuleLoaderProps> = ({
  children,
  reducers,
  removeAfterUnmount,
}) => {
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useDispatch();

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]: ReducerListEntry) => {
      store.reducerManager.add(name, reducer);
      dispatch({ type: `@INIT ${name} reducer` });
    });

    return () => {
      Object.entries(reducers).forEach(([name, reducer]: ReducerListEntry) => {
        if (removeAfterUnmount) {
          store.reducerManager.remove(name);
          dispatch({ type: `@CLEAR ${name} reducer` });
        }
      });
    };
  }, []);

  return <>{children}</>;
};

export default DynamicModuleLoader;
