import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import cls from "./ArticleSortSelector.module.scss";
import { classNames } from "@/shared/lib/classNames";
import { Select, SelectOption } from "@/shared/ui/Select/Select";
import { SortOrder } from "@/shared/types/sort";
import { ArticleSortField } from "../../../../entities/Article/model/consts/consts";

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
    <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
      <Select<ArticleSortField>
        onChange={onChangeSort}
        value={sort}
        options={sortFieldOptions}
        label={t("Sort by")}
      />
      <Select<SortOrder>
        onChange={onChangeOrder}
        value={order}
        options={orderOptions}
        label={t("Sort by")}
      />
    </div>
  );
};

export default ArticleSortSelector;
