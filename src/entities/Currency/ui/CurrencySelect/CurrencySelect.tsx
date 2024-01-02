import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Currency } from "../../model/types/currency";
import { ListBox } from "@/shared/ui/redesigned/Popups";

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

  const props = {
    className,
    value,
    defaultValue: t("Currency"),
    label: t("Currency"),
    items: options,
    onChange: onChangeHandler,
    readonly,
    direction: "top right" as const,
  };

  return <ListBox {...props} />;
};

export default CurrencySelect;
