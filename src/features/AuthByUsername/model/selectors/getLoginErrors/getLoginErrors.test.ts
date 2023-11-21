import { DeepPartial } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { getLoginErrors } from "./getLoginErrors";

describe("getLoginError.test", () => {
  test("should return error", () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        error: "error",
      },
    };
    expect(getLoginErrors(state as StateSchema)).toEqual("error");
  });

  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginErrors(state as StateSchema)).toEqual(undefined);
  });
});
