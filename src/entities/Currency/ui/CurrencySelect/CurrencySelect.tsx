import React, { useCallback } from "react";
import { classNames } from "@/shared/lib/classNames";
import { useTranslation } from "react-i18next";
import { Currency } from "../../model/types/currency";
import { ListBox as ListBoxDeprecated } from "@/shared/ui/deprecated/Popups";
import { ToggleFeatures } from "@/shared/lib/features/ToggleFeatures/ToggleFeatures";
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
    defaultValue: t("Specify currency"),
    label: t("Currency"),
    items: options,
    onChange: onChangeHandler,
    readonly,
    direction: "top right" as const,
  };

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<ListBox {...props} />}
      off={<ListBoxDeprecated {...props} />}
    />
  );
};

export default CurrencySelect;
