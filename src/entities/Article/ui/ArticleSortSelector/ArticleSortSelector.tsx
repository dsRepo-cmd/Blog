import React, { memo, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import cls from "./ArticleSortSelector.module.scss";
import { classNames } from "shared/lib/classNames";
import Select, { SelectOption } from "shared/ui/Select/Select";
import { SortOrder } from "shared/types";
import { ArticleSortField } from "../../model/consts/consts";

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

const ArticleSortSelector: React.FC<ArticleSortSelectorProps> = ({
  className,
  sort,
  order,
  onChangeOrder,
  onChangeSort,
}) => {
  const { t } = useTranslation();

  const orderOptions = useMemo<SelectOption[]>(
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

  const sortFieldOptions = useMemo<SelectOption[]>(
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

  const changeSortHandler = useCallback(
    (newSort: string) => {
      onChangeSort(newSort as ArticleSortField);
    },
    [onChangeSort]
  );

  const changeOrderHandler = useCallback(
    (newOrder: string) => {
      onChangeOrder(newOrder as SortOrder);
    },
    [onChangeOrder]
  );

  return (
    <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
      <Select
        onChange={changeSortHandler}
        value={sort}
        options={orderOptions}
        label={t("Sort by")}
      />
      <Select
        onChange={changeOrderHandler}
        value={order}
        options={sortFieldOptions}
        label={t("Sort by")}
      />
    </div>
  );
};

export default memo(ArticleSortSelector);
