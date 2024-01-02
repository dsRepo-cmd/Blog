import { StateSchema } from "@/app/providers/StoreProvider";
import { getLoginPassword } from "./getLoginPassword";

describe("getLoginPassword.test", () => {
  test("should return dsd5Rrrrr", () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        password: "dsd5Rrrrr",
      },
    };
    expect(getLoginPassword(state as StateSchema)).toEqual("dsd5Rrrrr");
  });

  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginPassword(state as StateSchema)).toEqual("");
  });
});
