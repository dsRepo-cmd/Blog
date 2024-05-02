import { FC } from "react";

import { Currency, CurrencySelect } from "@/entities/Currency";
import { Country, CountrySelect } from "@/entities/Coutnry";
import Card from "@/shared/ui/Card/Card";
import { HStack, VStack } from "@/shared/ui/Stack";
import Skeleton from "@/shared/ui/Skeleton/Skeleton";
import { useTranslation } from "react-i18next";
import Text from "@/shared/ui/Text/Text";
import { useSelector } from "react-redux";
import { getProfileValidateErrors } from "@/features/editableProfileCard/model/selectors/getProfileValidateErrors/getProfileValidateErrors";
import { ValidateProfileError } from "../../model/consts/consts";
import { BrowserView, MobileView } from "react-device-detect";
import Avatar from "@/shared/ui/Avatar/Avatar";
import Input from "@/shared/ui/Input/Input";
import { Profile } from "@/entities/Profile";

export interface ProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  error?: string;
  onChangeLastname?: (value?: string) => void;
  onChangeFirstname?: (value?: string) => void;
  onChangeEmail?: (value?: string) => void;
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
    onChangeEmail,
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

  ////

  if (isLoading) {
    return (
      <VStack max>
        <BrowserView style={{ width: "100%" }}>
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
        </BrowserView>

        <MobileView style={{ width: "100%" }}>
          <Card padding="24" max>
            <VStack gap="32" max>
              <HStack max justify="center">
                <Skeleton border="100%" width={128} height={128} />
              </HStack>

              <HStack gap="32" max>
                <VStack gap="16" max>
                  <Skeleton width="100%" height={38} />
                  <Skeleton width="100%" height={38} />
                  <Skeleton width="100%" height={38} />
                  <Skeleton width="100%" height={38} />
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
                  <Skeleton width="100%" height={38} />
                  <Skeleton width="100%" height={38} />
                  <Skeleton width="100%" height={38} />
                  <Skeleton width="100%" height={38} />
                </VStack>
              </HStack>
            </VStack>
          </Card>
        </MobileView>
      </VStack>
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
          {data?.user?.avatar && (
            <HStack justify="center" max>
              <Avatar size={128} src={data?.user?.avatar} />
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
                  validateErrors?.firstname &&
                  validateErrorTranslates[validateErrors?.firstname]
                }
              />
              <Input
                value={data?.lastname}
                label={t("Last name")}
                onChange={onChangeLastname}
                readonly={readonly}
                data-testid="ProfileCard.lastname"
                error={
                  validateErrors?.lastname &&
                  validateErrorTranslates[validateErrors?.lastname]
                }
              />
              <Input
                value={data?.age}
                label={t("Age")}
                onChange={onChangeAge}
                readonly={readonly}
                error={
                  validateErrors?.age &&
                  validateErrorTranslates[validateErrors?.age]
                }
              />
              <Input
                value={data?.user?.email}
                label={t("Email")}
                onChange={onChangeEmail}
                readonly={readonly}
                error={
                  validateErrors?.email &&
                  validateErrorTranslates[validateErrors?.email]
                }
              />
            </VStack>
            <VStack gap="16" max>
              <Input
                value={data?.user?.username}
                label={t("User name")}
                onChange={onChangeUsername}
                readonly={readonly}
                error={
                  validateErrors?.username &&
                  validateErrorTranslates[validateErrors?.username]
                }
              />
              <Input
                value={data?.user?.avatar}
                label={t("Avatar link")}
                onChange={onChangeAvatar}
                readonly={readonly}
                error={
                  validateErrors?.avatar &&
                  validateErrorTranslates[validateErrors?.avatar]
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
          {data?.user?.avatar && (
            <HStack justify="center" max>
              <Avatar size={128} src={data?.user?.avatar} />
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
                validateErrors?.firstname &&
                validateErrorTranslates[validateErrors?.firstname]
              }
            />
            <Input
              value={data?.lastname}
              label={t("Last name")}
              onChange={onChangeLastname}
              readonly={readonly}
              data-testid="ProfileCard.lastname"
              error={
                validateErrors?.lastname &&
                validateErrorTranslates[validateErrors?.lastname]
              }
            />
            <Input
              value={data?.age}
              label={t("Age")}
              onChange={onChangeAge}
              readonly={readonly}
              error={
                validateErrors?.age &&
                validateErrorTranslates[validateErrors?.age]
              }
            />
            <Input
              value={data?.user?.email}
              label={t("Country")}
              onChange={onChangeEmail}
              readonly={readonly}
              error={
                validateErrors?.email &&
                validateErrorTranslates[validateErrors?.email]
              }
            />

            <Input
              value={data?.user?.username}
              label={t("User name")}
              onChange={onChangeUsername}
              readonly={readonly}
              error={
                validateErrors?.username &&
                validateErrorTranslates[validateErrors?.username]
              }
            />
            <Input
              value={data?.user?.avatar}
              label={t("Avatar link")}
              onChange={onChangeAvatar}
              readonly={readonly}
              error={
                validateErrors?.avatar &&
                validateErrorTranslates[validateErrors?.avatar]
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
