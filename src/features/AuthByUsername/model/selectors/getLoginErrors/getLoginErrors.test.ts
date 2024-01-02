import { StateSchema } from "@/app/providers/StoreProvider";
import { getLoginErrors } from "./getLoginErrors";
import { ValidateAuthError, ValidateAuthErrorType } from "../../const/const";

describe("getLoginError.test", () => {
  test("should return error", () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        validateErrors: [
          {
            type: ValidateAuthErrorType.DATA,
            error: ValidateAuthError.NO_DATA,
          },
        ],
      },
    };
    expect(getLoginErrors(state as StateSchema)).toEqual([
      {
        type: "data",
        error: "NO_DATA",
      },
    ]);
  });

  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginErrors(state as StateSchema)).toEqual(undefined);
  });
});
