import { FC } from "react";
import { Profile } from "../../model/types/profile";
import { Currency } from "@/entities/Currency";
import { Country } from "@/entities/Coutnry";
import ProfileCardRedesigned, {
  ProfileCardRedesignedError,
  ProfileCardRedesignedSkeleton,
} from "../ProfileCardRedesigned/ProfileCardRedesigned";

export interface ProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  error?: string;
  onChangeLastname?: (value?: string) => void;
  onChangeFirstname?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeAge?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeCountry?: (country: Country) => void;

  readonly?: boolean;
}

export const ProfileCard: FC<ProfileCardProps> = (props) => {
  const { isLoading, error } = props;

  if (isLoading) {
    return <ProfileCardRedesignedSkeleton />;
  }

  if (error) {
    return <ProfileCardRedesignedError />;
  }

  return <ProfileCardRedesigned {...props} />;
};
