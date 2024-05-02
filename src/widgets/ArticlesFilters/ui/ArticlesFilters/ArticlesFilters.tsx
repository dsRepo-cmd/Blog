import { FC, memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import cls from "./ArticlesFilters.module.scss";
import { ArticleSortSelector } from "@/features/ArticleSortSelector";
import { ArticleTypeTabs } from "@/features/ArticleTypeTabs";
import { HStack, VStack } from "@/shared/ui/Stack";
import { ArticleSortField, ArticleType } from "@/entities/Article";
import { SortOrder } from "@/shared/types/sort";
import { classNames } from "@/shared/lib/classNames";
import Card from "@/shared/ui/Card/Card";
import Input from "@/shared/ui/Input/Input";
import { Icon } from "@/shared/ui/Icon/Icon";
import SearchIcon from "@/shared/assets/icons/search.svg";
import { BrowserView, MobileView } from "react-device-detect";
import DownArrowIcon from "@/shared/assets/icons/arrow-bottom.svg";
import { Drawer } from "@/shared/ui/Drawer/Drawer";
import Toggle from "@/shared/ui/Toggle/Toggle";

interface ArticlesFiltersProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  type: ArticleType;
  search: string;
  isPublished: boolean;
  onChangeSearch: (value: string) => void;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
  onChangeType: (type: ArticleType) => void;

  onChangePublished: (value: boolean) => void;
}

const ArticlesFilters: FC<ArticlesFiltersProps> = ({
  className,
  onChangeType,
  onChangeSearch,
  onChangeSort,
  onChangeOrder,
  onChangePublished,
  isPublished,
  search,
  sort,
  order,
  type,
}) => {
  const { t } = useTranslation("article");
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
              placeholder={t("Search")}
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
            <Toggle
              defaultChecked={isPublished}
              label={t("Published")}
              onChange={onChangePublished}
            />
          </VStack>
        </Card>
      </BrowserView>

      <MobileView>
        <Card
          padding="12"
          className={classNames(cls.ArticlesMobileFilters, {}, [className])}
        >
          <HStack gap="8">
            <Input
              onChange={onChangeSearch}
              value={search}
              placeholder={t("Search")}
              addonLeft={<Icon Svg={SearchIcon} />}
            />
            <Icon Svg={DownArrowIcon} clickable onClick={onOpenDrawer} />
          </HStack>
          <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
            <VStack padding="16" gap={"12"}>
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
              <Toggle
                defaultChecked={isPublished}
                label="Published"
                onChange={onChangePublished}
              />
            </VStack>
          </Drawer>
        </Card>
      </MobileView>
    </>
  );
};

export default memo(ArticlesFilters);
