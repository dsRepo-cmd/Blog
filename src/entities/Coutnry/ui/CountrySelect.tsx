import React, { useCallback } from "react";

import { useTranslation } from "react-i18next";
import { Country } from "../model/types/country";
import { ListBox as ListBoxDeprecated } from "@/shared/ui/deprecated/Popups";
import { ToggleFeatures } from "@/shared/lib/features/ToggleFeatures/ToggleFeatures";
import { ListBox } from "@/shared/ui/redesigned/Popups";

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

  const props = {
    className,
    value,
    defaultValue: t("Country"),
    label: t("Country"),
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

export default CountrySelect;
