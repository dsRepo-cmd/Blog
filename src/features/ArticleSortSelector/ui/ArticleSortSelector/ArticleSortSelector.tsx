import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames";
import { SortOrder } from "@/shared/types/sort";
import { ArticleSortField } from "../../../../entities/Article/model/consts/consts";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import Text from "@/shared/ui/redesigned/Text/Text";
import { ListBox } from "@/shared/ui/redesigned/Popups";

export interface SelectOption<T extends string> {
  value: T;
  content: string;
}
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
  const { t } = useTranslation("article");

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
    <HStack align={"center"} className={classNames("", {}, [className])}>
      <VStack gap="8">
        <Text text={t("Sort by")} />
        <ListBox
          items={sortFieldOptions}
          value={sort}
          onChange={onChangeSort}
        />
        <ListBox items={orderOptions} value={order} onChange={onChangeOrder} />
      </VStack>
    </HStack>
  );
};

export default ArticleSortSelector;
