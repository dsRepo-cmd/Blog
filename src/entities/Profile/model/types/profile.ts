import { Country } from "@/entities/Coutnry";
import { Currency } from "@/entities/Currency";

interface UserData {
  id?: string;
  email?: string;
  username?: string;
  avatar?: string;
}
export interface Profile {
  id?: string;
  first?: string;
  lastname?: string;
  age?: number;
  currency?: Currency;
  country?: Country;
  user?: UserData;
}
