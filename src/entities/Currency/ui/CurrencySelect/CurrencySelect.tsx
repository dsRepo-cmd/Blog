import React, { useCallback } from "react";
import { classNames } from "shared/lib/classNames";

import { useTranslation } from "react-i18next";

import Select from "shared/ui/Select/Select";
import { Currency } from "entities/Currency/model/types/currency";

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

const options = [
  { value: Currency.UAN, content: Currency.UAN },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
];

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  className,
  value,
  onChange,
  readonly,
}) => {
  const { t } = useTranslation();

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Currency);
    },
    [onChange]
  );

  return (
    <Select
      className={classNames("", {}, [className])}
      label={t("Currency")}
      options={options}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
    />
  );
};

export default CurrencySelect;
