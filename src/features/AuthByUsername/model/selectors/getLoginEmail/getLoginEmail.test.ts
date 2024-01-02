import { StateSchema } from "@/app/providers/StoreProvider";
import { getLoginEmail } from "./getLoginEmail";

describe("getLoginUsername.test", () => {
  test("should return 123", () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        username: "admin",
      },
    };
    expect(getLoginEmail(state as StateSchema)).toEqual("admin");
  });

  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginEmail(state as StateSchema)).toEqual("");
  });
});
