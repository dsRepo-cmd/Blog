import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import cls from "./ArticleSortSelector.module.scss";
import { classNames } from "@/shared/lib/classNames";
import { Select, SelectOption } from "@/shared/ui/deprecated/Select/Select";
import { SortOrder } from "@/shared/types/sort";
import { ArticleSortField } from "../../../../entities/Article/model/consts/consts";
import { ToggleFeatures } from "@/shared/lib/features/ToggleFeatures/ToggleFeatures";
import { VStack } from "@/shared/ui/redesigned/Stack";
import Text from "@/shared/ui/redesigned/Text/Text";
import { ListBox } from "@/shared/ui/redesigned/Popups";

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

const ArticleSortSelector: React.FC<ArticleSortSelectorProps> = ({
  className,
  onChangeOrder,
  onChangeSort,
  order,
  sort,
}) => {
  const { t } = useTranslation();

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
      {
        value: "asc",
        content: t("ascending"),
      },
      {
        value: "desc",
        content: t("descending"),
      },
    ],
    [t]
  );

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
    () => [
      {
        value: ArticleSortField.CREATED,
        content: t("creation date"),
      },
      {
        value: ArticleSortField.TITLE,
        content: t("name"),
      },
      {
        value: ArticleSortField.VIEWS,
        content: t("views"),
      },
    ],
    [t]
  );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <div
          className={classNames(cls.ArticleSortSelectorRedesigned, {}, [
            className,
          ])}
        >
          <VStack gap="8">
            <Text text={t("Sort by")} />
            <ListBox
              items={sortFieldOptions}
              value={sort}
              onChange={onChangeSort}
            />
            <ListBox
              items={orderOptions}
              value={order}
              onChange={onChangeOrder}
            />
          </VStack>
        </div>
      }
      off={
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
          <Select<ArticleSortField>
            options={sortFieldOptions}
            label={t("Sort by")}
            value={sort}
            onChange={onChangeSort}
          />
          <Select
            options={orderOptions}
            label={t("по")}
            value={order}
            onChange={onChangeOrder}
            className={cls.order}
          />
        </div>
      }
    />
  );
};

export default ArticleSortSelector;
