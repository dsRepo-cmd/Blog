import { StateSchema } from "@/app/providers/StoreProvider";
import { getLoginEmail } from "./getLoginEmail";

describe("getLoginEmail.test", () => {
  test("should return 123", () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        email: "test@mail.com",
      },
    };
    expect(getLoginEmail(state as StateSchema)).toEqual("test@mail.com");
  });

  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginEmail(state as StateSchema)).toEqual("");
  });
});
