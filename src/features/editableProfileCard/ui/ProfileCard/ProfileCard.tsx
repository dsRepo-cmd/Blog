import { FC } from "react";

import { Currency, CurrencySelect } from "@/entities/Currency";
import { Country, CountrySelect } from "@/entities/Coutnry";
import Card from "@/shared/ui/redesigned/Card/Card";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import Skeleton from "@/shared/ui/redesigned/Skeleton/Skeleton";
import { useTranslation } from "react-i18next";
import Text from "@/shared/ui/redesigned/Text/Text";
import { useSelector } from "react-redux";
import { getProfileValidateErrors } from "@/features/editableProfileCard/model/selectors/getProfileValidateErrors/getProfileValidateErrors";
import { ValidateProfileError } from "../../model/consts/consts";
import { filterProfileErrors } from "../../model/services/filterErrors/filterErrors";
import { BrowserView, MobileView } from "react-device-detect";
import Avatar from "@/shared/ui/redesigned/Avatar/Avatar";
import Input from "@/shared/ui/redesigned/Input/Input";
import { Profile } from "@/entities/Profile";
import { FilteredError } from "../../model/types/editableProfileCardSchema";

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
  const {
    isLoading,
    error,
    className,
    data,
    readonly,
    onChangeFirstname,
    onChangeLastname,
    onChangeAge,
    onChangeCity,
    onChangeAvatar,
    onChangeUsername,
    onChangeCountry,
    onChangeCurrency,
  } = props;
  const { t } = useTranslation("profile");

  // Validate errors
  const validateErrors = useSelector(getProfileValidateErrors);

  const validateErrorTranslates: { [key: string]: string } = {
    [ValidateProfileError.SERVER_ERROR]: t("Server error"),
    [ValidateProfileError.INCORRECT_AGE]: t("Incorrect age"),
    [ValidateProfileError.INCORRECT_AVATAR]: t("Incorrect avatar"),
    [ValidateProfileError.INCORRECT_EMAIL]: t("Incorrect email"),
    [ValidateProfileError.INCORRECT_COUNTRY]: t("Incorrect country"),
    [ValidateProfileError.INCORRECT_CURRENCY]: t("No currency"),
    [ValidateProfileError.INCORRECT_FIRSTNAME]: t("Incorrect firstname"),
    [ValidateProfileError.INCORRECT_LASTNAME]: t("Incorrect lastname"),
    [ValidateProfileError.INCORRECT_USERNAME]: t("Incorrect username"),
    [ValidateProfileError.INCORRECT_USER_DATA]: t("Incorrect user data"),

    [ValidateProfileError.NO_DATA]: t("No data"),
  };

  let FilteredError: FilteredError = {};

  if (validateErrors) {
    FilteredError = filterProfileErrors(validateErrors);
  }
  console.log(validateErrors);
  ////

  if (isLoading) {
    return (
      <Card padding="24" max>
        <VStack gap="32">
          <HStack max justify="center">
            <Skeleton border="100%" width={128} height={128} />
          </HStack>
          <HStack gap="32" max>
            <VStack gap="16" max>
              <Skeleton width="100%" height={38} />
              <Skeleton width="100%" height={38} />
              <Skeleton width="100%" height={38} />
              <Skeleton width="100%" height={38} />
            </VStack>

            <VStack gap="16" max>
              <Skeleton width="100%" height={38} />
              <Skeleton width="100%" height={38} />
              <Skeleton width="100%" height={38} />
              <Skeleton width="100%" height={38} />
            </VStack>
          </HStack>
        </VStack>
      </Card>
    );
  }

  if (error) {
    return (
      <HStack justify="center" max>
        <Text
          variant="error"
          title={t("There was an error loading your profile")}
          text={t("Try refreshing the page")}
          align="center"
        />
      </HStack>
    );
  }

  return (
    <Card padding="24" max className={className}>
      <BrowserView>
        <VStack gap="32">
          {data?.avatar && (
            <HStack justify="center" max>
              <Avatar size={128} src={data?.avatar} />
            </HStack>
          )}
          <HStack gap="24" max>
            <VStack gap="16" max>
              <Input
                value={data?.first}
                label={t("First name")}
                onChange={onChangeFirstname}
                readonly={readonly}
                data-testid="ProfileCard.firstname"
                error={
                  FilteredError.firstError &&
                  validateErrorTranslates[FilteredError.firstError]
                }
              />
              <Input
                value={data?.lastname}
                label={t("Last name")}
                onChange={onChangeLastname}
                readonly={readonly}
                data-testid="ProfileCard.lastname"
                error={
                  FilteredError.lastnameError &&
                  validateErrorTranslates[FilteredError.lastnameError]
                }
              />
              <Input
                value={data?.age}
                label={t("Age")}
                onChange={onChangeAge}
                readonly={readonly}
                error={
                  FilteredError.ageError &&
                  validateErrorTranslates[FilteredError.ageError]
                }
              />
              <Input
                value={data?.email}
                label={t("Email")}
                onChange={onChangeCity}
                readonly={readonly}
                error={
                  FilteredError.emailError &&
                  validateErrorTranslates[FilteredError.emailError]
                }
              />
            </VStack>
            <VStack gap="16" max>
              <Input
                value={data?.username}
                label={t("User name")}
                onChange={onChangeUsername}
                readonly={readonly}
                error={
                  FilteredError.usernameError &&
                  validateErrorTranslates[FilteredError.usernameError]
                }
              />
              <Input
                value={data?.avatar}
                label={t("Avatar link")}
                onChange={onChangeAvatar}
                readonly={readonly}
                error={
                  FilteredError.avatarError &&
                  validateErrorTranslates[FilteredError.avatarError]
                }
              />
              <CurrencySelect
                value={data?.currency}
                onChange={onChangeCurrency}
                readonly={readonly}
              />
              <CountrySelect
                value={data?.country}
                onChange={onChangeCountry}
                readonly={readonly}
              />
            </VStack>
          </HStack>
        </VStack>
      </BrowserView>

      <MobileView>
        <VStack gap="32">
          {data?.avatar && (
            <HStack justify="center" max>
              <Avatar size={128} src={data?.avatar} />
            </HStack>
          )}
          <VStack gap="24" max>
            <Input
              value={data?.first}
              label={t("First name")}
              onChange={onChangeFirstname}
              readonly={readonly}
              data-testid="ProfileCard.firstname"
              error={
                FilteredError.firstError &&
                validateErrorTranslates[FilteredError.firstError]
              }
            />
            <Input
              value={data?.lastname}
              label={t("Last name")}
              onChange={onChangeLastname}
              readonly={readonly}
              data-testid="ProfileCard.lastname"
              error={
                FilteredError.lastnameError &&
                validateErrorTranslates[FilteredError.lastnameError]
              }
            />
            <Input
              value={data?.age}
              label={t("Age")}
              onChange={onChangeAge}
              readonly={readonly}
              error={
                FilteredError.ageError &&
                validateErrorTranslates[FilteredError.ageError]
              }
            />
            <Input
              value={data?.email}
              label={t("Country")}
              onChange={onChangeCity}
              readonly={readonly}
              error={
                FilteredError.emailError &&
                validateErrorTranslates[FilteredError.emailError]
              }
            />

            <Input
              value={data?.username}
              label={t("User name")}
              onChange={onChangeUsername}
              readonly={readonly}
              error={
                FilteredError.usernameError &&
                validateErrorTranslates[FilteredError.usernameError]
              }
            />
            <Input
              value={data?.avatar}
              label={t("Avatar link")}
              onChange={onChangeAvatar}
              readonly={readonly}
              error={
                FilteredError.ageError &&
                validateErrorTranslates[FilteredError.ageError]
              }
            />
            <CurrencySelect
              value={data?.currency}
              onChange={onChangeCurrency}
              readonly={readonly}
            />
            <CountrySelect
              value={data?.country}
              onChange={onChangeCountry}
              readonly={readonly}
            />
          </VStack>
        </VStack>
      </MobileView>
    </Card>
  );
};
