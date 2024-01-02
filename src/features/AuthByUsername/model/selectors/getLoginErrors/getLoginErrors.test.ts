import { StateSchema } from "@/app/providers/StoreProvider";
import { getLoginErrors } from "./getLoginErrors";
import { ValidateAuthError } from "../../const/const";

describe("getLoginError.test", () => {
  test("should return error", () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        validateErrors: {
          data: ValidateAuthError.NO_DATA,
        },
      },
    };
    expect(getLoginErrors(state as StateSchema)).toEqual([
      {
        error: "NO_DATA",
      },
    ]);
  });

  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginErrors(state as StateSchema)).toEqual(undefined);
  });
});
