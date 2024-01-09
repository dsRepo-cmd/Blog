import { Country } from "@/entities/Coutnry";
import { Currency } from "@/entities/Currency";
import { User } from "@/entities/User";

export interface Profile {
  id?: string;
  first?: string;
  lastname?: string;
  age?: number;
  currency?: Currency;
  country?: Country;
  user?: Partial<User>;
}
