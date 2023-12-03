import React, { useCallback } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./CountrySelect.module.scss";
import { useTranslation } from "react-i18next";
import { Country } from "../model/types/country";
import Select from "shared/ui/Select/Select";

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = [
  { value: Country.UKRAINE, content: Country.UKRAINE },
  { value: Country.USA, content: Country.USA },
  { value: Country.POLLAND, content: Country.POLLAND },
];

const CountrySelect: React.FC<CountrySelectProps> = ({
  className,
  value,
  onChange,
  readonly,
}) => {
  const { t } = useTranslation();

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Country);
    },
    [onChange]
  );

  return (
    <Select
      className={classNames("", {}, [className])}
      label={t("Country")}
      options={options}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
    />
  );
};

export default CountrySelect;
