import { useTranslation } from "react-i18next";
import { Input } from "@/shared/ui/deprecated/Input/Input";
import cls from "./ProfileCard.module.scss";
import { Mods, classNames } from "@/shared/lib/classNames";
import Text, { TextAlign, TextTheme } from "@/shared/ui/deprecated/Text/Text";
import { FC } from "react";
import { Profile } from "../../model/types/profile";
import Loader from "@/shared/ui/deprecated/Loader/Loader";

import { VStack } from "@/shared/ui/redesigned/Stack";
import { Currency, CurrencySelect } from "@/entities/Currency";
import { Country, CountrySelect } from "@/entities/Coutnry";
import Avatar from "@/shared/ui/deprecated/Avatar/Avatar";

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
      max
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
        lable={t("Firstname")}
        value={data?.first || ""}
        placeholder={t("Firstname")}
        className={cls.input}
        onChange={onChangeFirstname}
        readonly={readonly}
      />
      <Input
        lable={t("Lastname")}
        value={data?.lastname || ""}
        placeholder={t("Lastname")}
        className={cls.input}
        onChange={onChangeLastname}
        readonly={readonly}
      />
      <Input
        lable={t("Age")}
        value={data?.age || ""}
        placeholder={t("Age")}
        className={cls.input}
        onChange={onChangeAge}
        readonly={readonly}
      />
      <Input
        lable={t("City")}
        value={data?.city || ""}
        placeholder={t("City")}
        className={cls.input}
        onChange={onChangeCity}
        readonly={readonly}
      />
      <Input
        lable={t("Avatar link")}
        value={data?.avatar || ""}
        placeholder={t("Avatar link")}
        className={cls.input}
        onChange={onChangeAvatar}
        readonly={readonly}
      />
      <Input
        lable={t("Username")}
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
