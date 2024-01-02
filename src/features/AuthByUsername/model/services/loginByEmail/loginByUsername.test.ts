import { userActions } from "@/entities/User";
import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { loginByEmail } from "./loginByEmail";

describe("loginByEmail.test", () => {
  test("success login", async () => {
    const userValue = { email: "123", id: "1" };

    const thunk = new TestAsyncThunk(loginByEmail);
    thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));
    const result = await thunk.callThunk({
      email: "admin@mail.com",
      password: "dsd5Rrrrr",
    });

    expect(thunk.dispatch).toHaveBeenCalledWith(
      userActions.setAuthData(userValue)
    );
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(userValue);
  });

  test("error login", async () => {
    const thunk = new TestAsyncThunk(loginByEmail);
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk({
      email: "admin@mail.com",
      password: "123Rt1234",
    });

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toStrictEqual({ data: "Wrong email or password" });
  });
});
