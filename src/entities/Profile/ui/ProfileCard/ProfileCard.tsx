import { useTranslation } from "react-i18next";
import { Input } from "shared/ui/Input/Input";
import cls from "./ProfileCard.module.scss";
import { Mods, classNames } from "shared/lib/classNames";
import Text, { TextAlign, TextTheme } from "shared/ui/Text/Text";
import { FC } from "react";
import { Profile } from "../../model/types/profile";
import Loader from "shared/ui/Loader/Loader";

import { Currency } from "entities/Currency/model/types/currency";
import { Country } from "entities/Coutnry/model/types/country";
import CurrencySelect from "entities/Currency/ui/CurrencySelect/CurrencySelect";
import CountrySelect from "entities/Coutnry/ui/CountrySelect";
import Avatar from "shared/ui/Avatar/Avatar";
import { VStack } from "shared/ui/Stack";

interface ProfileCardProps {
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

export const ProfileCard: FC<ProfileCardProps> = ({
  className,
  data,
  isLoading,
  error,
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

  if (isLoading) {
    return (
      <VStack
        max
        align="center"
        className={classNames(cls.ProfileCard, { [cls.loading]: true }, [
          className,
        ])}
      >
        <Loader />
      </VStack>
    );
  }

  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          title={t("Error")}
          text={t("Try refreshing the page")}
          align={TextAlign.CENTER}
        />
      </div>
    );
  }

  const mods: Mods = {
    [cls.editing]: !readonly,
  };

  return (
    <VStack
      gap="12"
      align="stretch"
      className={classNames(cls.ProfileCard, mods, [className])}
    >
      {data?.avatar && (
        <div className={cls.avatarWrapper}>
          <Avatar src={data?.avatar} />
        </div>
      )}
      <Input
        value={data?.first || ""}
        placeholder={t("Firstname")}
        className={cls.input}
        onChange={onChangeFirstname}
        readonly={readonly}
      />
      <Input
        value={data?.lastname || ""}
        placeholder={t("Lastname")}
        className={cls.input}
        onChange={onChangeLastname}
        readonly={readonly}
      />
      <Input
        value={data?.age || ""}
        placeholder={t("Age")}
        className={cls.input}
        onChange={onChangeAge}
        readonly={readonly}
      />
      <Input
        value={data?.city || ""}
        placeholder={t("City")}
        className={cls.input}
        onChange={onChangeCity}
        readonly={readonly}
      />
      <Input
        value={data?.avatar || ""}
        placeholder={t("Avatar link")}
        className={cls.input}
        onChange={onChangeAvatar}
        readonly={readonly}
      />
      <Input
        value={data?.username || ""}
        placeholder={t("Username")}
        className={cls.input}
        onChange={onChangeUsername}
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
