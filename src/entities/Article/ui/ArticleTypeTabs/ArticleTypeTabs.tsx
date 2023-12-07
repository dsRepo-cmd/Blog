import React, { memo, useMemo, useCallback } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./ArticleTypeTabs.module.scss";
import { useTranslation } from "react-i18next";
import { ArticleType } from "pages/ArticlesPage";
import Tabs, { TabItem } from "shared/ui/Tabs/Tabs";

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

const ArticleTypeTabs: React.FC<ArticleTypeTabsProps> = ({
  className,
  value,
  onChangeType,
}) => {
  const { t } = useTranslation();

  const typeTabs = useMemo<TabItem[]>(
    () => [
      { value: ArticleType.IT, content: t("IT") },
      { value: ArticleType.ALL, content: t("ALL") },
      { value: ArticleType.ECONOMICS, content: t("ECONOMICS") },
      { value: ArticleType.SCIENCE, content: t("SCIENCE") },
      { value: ArticleType.POLITICS, content: t("POLITICS") },
    ],
    [t]
  );

  const onTabClick = useCallback(
    (tab: TabItem) => {
      onChangeType(tab.value as ArticleType);
    },
    [onChangeType]
  );

  return (
    <Tabs
      tabs={typeTabs}
      value={value}
      onTabClick={onTabClick}
      className={classNames(cls.ArticleTypeTabs, {}, [className])}
    />
  );
};

export default memo(ArticleTypeTabs);
