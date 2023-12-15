import { CountrySelect } from "@/entities/Coutnry";
import { CurrencySelect } from "@/entities/Currency";
import Avatar from "@/shared/ui/redesigned/Avatar/Avatar";
import Card from "@/shared/ui/redesigned/Card/Card";
import Input from "@/shared/ui/redesigned/Input/Input";
import Skeleton from "@/shared/ui/redesigned/Skeleton/Skeleton";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import Text from "@/shared/ui/redesigned/Text/Text";
import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { ProfileCardProps } from "../ProfileCard/ProfileCard";

import cls from "./ProfileCardRedesigned.module.scss";

export const ProfileCardRedesignedError = () => {
  const { t } = useTranslation();

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
};

export const ProfileCardRedesignedSkeleton = () => {
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
};

const ProfileCardRedesigned: FC<ProfileCardProps> = ({
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
}) => {
  const { t } = useTranslation("profile");

  return (
    <Card padding="24" max className={className}>
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
            />
            <Input
              value={data?.lastname}
              label={t("Last name")}
              onChange={onChangeLastname}
              readonly={readonly}
              data-testid="ProfileCard.lastname"
            />
            <Input
              value={data?.age}
              label={t("Age")}
              onChange={onChangeAge}
              readonly={readonly}
            />
            <Input
              value={data?.city}
              label={t("Country")}
              onChange={onChangeCity}
              readonly={readonly}
            />
          </VStack>
          <VStack gap="16" max>
            <Input
              value={data?.username}
              label={t("User name")}
              onChange={onChangeUsername}
              readonly={readonly}
            />
            <Input
              value={data?.avatar}
              label={t("Avatar link")}
              onChange={onChangeAvatar}
              readonly={readonly}
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
    </Card>
  );
};
export default memo(ProfileCardRedesigned);
