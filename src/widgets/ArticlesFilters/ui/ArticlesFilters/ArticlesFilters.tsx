import { FC, memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import cls from "./ArticlesFilters.module.scss";
import { ArticleSortSelector } from "@/features/ArticleSortSelector";
import { ArticleTypeTabs } from "@/features/ArticleTypeTabs";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { ArticleSortField, ArticleType } from "@/entities/Article";
import { SortOrder } from "@/shared/types/sort";
import { classNames } from "@/shared/lib/classNames";
import Card from "@/shared/ui/redesigned/Card/Card";
import Input from "@/shared/ui/redesigned/Input/Input";
import { Icon } from "@/shared/ui/redesigned/Icon/Icon";
import SearchIcon from "@/shared/assets/icons/search.svg";
import { BrowserView, MobileView } from "react-device-detect";
import DownArrowIcon from "@/shared/assets/icons/arrow-bottom.svg";
import { Drawer } from "@/shared/ui/redesigned/Drawer/Drawer";

interface ArticlesFiltersProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  type: ArticleType;
  search: string;
  onChangeSearch: (value: string) => void;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
  onChangeType: (type: ArticleType) => void;
}

const ArticlesFilters: FC<ArticlesFiltersProps> = ({
  className,
  onChangeType,
  onChangeSearch,
  search,
  onChangeSort,
  sort,
  onChangeOrder,
  order,
  type,
}) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);
  const onCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <BrowserView>
        <Card
          className={classNames(cls.ArticlesFilters, {}, [className])}
          padding="24"
        >
          <VStack gap="32">
            <Input
              onChange={onChangeSearch}
              value={search}
              placeholder={t("Поиск")}
              addonLeft={<Icon Svg={SearchIcon} />}
            />
            <ArticleTypeTabs
              value={type}
              onChangeType={onChangeType}
              className={cls.tabs}
            />
            <ArticleSortSelector
              order={order}
              sort={sort}
              onChangeOrder={onChangeOrder}
              onChangeSort={onChangeSort}
            />
          </VStack>
        </Card>
      </BrowserView>

      <MobileView>
        <Card
          className={classNames(cls.ArticlesMobileFilters, {}, [className])}
        >
          <HStack gap="8">
            <Input
              onChange={onChangeSearch}
              value={search}
              placeholder={t("Поиск")}
              addonLeft={<Icon Svg={SearchIcon} />}
            />
            <Icon Svg={DownArrowIcon} clickable onClick={onOpenDrawer} />
          </HStack>
          <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
            <VStack gap={"12"}>
              <ArticleTypeTabs
                value={type}
                onChangeType={onChangeType}
                className={cls.tabs}
              />
              <ArticleSortSelector
                order={order}
                sort={sort}
                onChangeOrder={onChangeOrder}
                onChangeSort={onChangeSort}
              />
            </VStack>
          </Drawer>
        </Card>
      </MobileView>
    </>
  );
};

export default memo(ArticlesFilters);
