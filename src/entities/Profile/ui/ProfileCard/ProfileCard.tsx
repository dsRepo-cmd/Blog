import { FC } from "react";
import { Profile } from "../../model/types/profile";
import { Currency } from "@/entities/Currency";
import { Country } from "@/entities/Coutnry";
import { ToggleFeatures } from "@/shared/lib/features/ui/ToggleFeatures/ToggleFeatures";
import ProfileCardRedesigned, {
  ProfileCardRedesignedError,
  ProfileCardRedesignedSkeleton,
} from "../ProfileCardRedesigned/ProfileCardRedesigned";
import ProfileCardDeprecated, {
  ProfileCardDeprecatedError,
  ProfileCardDeprecatedLoader,
} from "../ProfileCardDeprecated/ProfileCardDeprecated";

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
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<ProfileCardRedesignedSkeleton />}
        off={<ProfileCardDeprecatedLoader />}
      />
    );
  }

  if (error) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<ProfileCardRedesignedError />}
        off={<ProfileCardDeprecatedError />}
      />
    );
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<ProfileCardRedesigned {...props} />}
      off={<ProfileCardDeprecated {...props} />}
    />
  );
};
