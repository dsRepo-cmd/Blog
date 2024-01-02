import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk";

import { Currency } from "@/entities/Currency";
import { fetchProfileData } from "./fetchProfileData";
import { Country } from "@/entities/Coutnry";

const data = {
  username: "admin",
  age: 40,
  country: Country.USA,
  lastname: "Eastwood",
  first: "Clint",
  city: "New York",
  currency: Currency.EUR,
};

describe("fetchProfileData.test", () => {
  test("success", async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ data }));

    const result = await thunk.callThunk("1");

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(data);
  });

  test("error login", async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk("1");

    expect(result.type).toBeDefined();
  });
});
