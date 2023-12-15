import { Mods, classNames } from "@/shared/lib/classNames";
import TextDeprecated, {
  TextAlign,
  TextTheme,
} from "@/shared/ui/deprecated/Text/Text";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import cls from "./ProfileCardDeprecated.module.scss";
import Loader from "@/shared/ui/deprecated/Loader/Loader";
import { ProfileCardProps } from "../ProfileCard/ProfileCard";
import AvatarDeprecated from "@/shared/ui/deprecated/Avatar/Avatar";
import { Input as InputDeprecated } from "@/shared/ui/deprecated/Input/Input";
import { CurrencySelect } from "@/entities/Currency";
import { CountrySelect } from "@/entities/Coutnry";

export const ProfileCardDeprecatedError = () => {
  const { t } = useTranslation();

  return (
    <HStack
      justify="center"
      max
      className={classNames(cls.ProfileCard, {}, [cls.error])}
    >
      <TextDeprecated
        theme={TextTheme.ERROR}
        title={t("There was an error loading your profile")}
        text={t("Try refreshing the page")}
        align={TextAlign.CENTER}
      />
    </HStack>
  );
};

export const ProfileCardDeprecatedLoader = () => {
  return (
    <HStack
      justify="center"
      max
      className={classNames(cls.ProfileCard, { [cls.loading]: true })}
    >
      <Loader />
    </HStack>
  );
};

const ProfileCardDeprecated: FC<ProfileCardProps> = ({
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

  const mods: Mods = {
    [cls.editing]: !readonly,
  };

  return (
    <VStack
      gap="8"
      max
      className={classNames(cls.ProfileCard, mods, [className])}
    >
      {data?.avatar && (
        <HStack justify="center" max className={cls.avatarWrapper}>
          <AvatarDeprecated src={data?.avatar} />
        </HStack>
      )}
      <InputDeprecated
        value={data?.first}
        placeholder={t("First name")}
        className={cls.input}
        onChange={onChangeFirstname}
        readonly={readonly}
        data-testid="ProfileCard.firstname"
      />
      <InputDeprecated
        value={data?.lastname}
        placeholder={t("Last name")}
        className={cls.input}
        onChange={onChangeLastname}
        readonly={readonly}
        data-testid="ProfileCard.lastname"
      />
      <InputDeprecated
        value={data?.age}
        placeholder={t("Age")}
        className={cls.input}
        onChange={onChangeAge}
        readonly={readonly}
      />
      <InputDeprecated
        value={data?.city}
        placeholder={t("Сountry")}
        className={cls.input}
        onChange={onChangeCity}
        readonly={readonly}
      />
      <InputDeprecated
        value={data?.username}
        placeholder={t("Enter your username")}
        className={cls.input}
        onChange={onChangeUsername}
        readonly={readonly}
      />
      <InputDeprecated
        value={data?.avatar}
        placeholder={t("Enter a link to your avatar")}
        className={cls.input}
        onChange={onChangeAvatar}
        readonly={readonly}
      />
      <CurrencySelect
        className={cls.input}
        value={data?.currency}
        onChange={onChangeCurrency}
        readonly={readonly}
      />
      <CountrySelect
        className={cls.input}
        value={data?.country}
        onChange={onChangeCountry}
        readonly={readonly}
      />
    </VStack>
  );
};

export default memo(ProfileCardDeprecated);
