import React, { useCallback } from "react";
import { classNames } from "shared/lib/classNames";
import { useTranslation } from "react-i18next";
import { Currency } from "../../model/types/currency";
import { ListBox } from "shared/ui/Popups";

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
    <ListBox
      className={classNames("", {}, [className])}
      label={`${t("Currency")}:`}
      onChange={onChangeHandler}
      items={options}
      defaultValue={t("Select currency")}
      value={value}
      readonly={readonly}
    />
  );
};

export default CurrencySelect;
