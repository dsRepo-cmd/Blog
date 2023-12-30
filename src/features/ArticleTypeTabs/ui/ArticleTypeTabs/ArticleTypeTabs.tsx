import React, { memo, useMemo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames";
import { useTranslation } from "react-i18next";
import { ArticleType } from "../../../../entities/Article/model/consts/consts";
import Tabs, { TabItem } from "@/shared/ui/redesigned/Tabs/Tabs";

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
      { value: ArticleType.ALL, content: t("All") },
      { value: ArticleType.IT, content: t("IT") },
      { value: ArticleType.ECONOMICS, content: t("Economics") },
      { value: ArticleType.SCIENCE, content: t("Science") },
      { value: ArticleType.POLITICS, content: t("Politics") },
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
      direction="column"
      tabs={typeTabs}
      value={value}
      onTabClick={onTabClick}
      className={classNames("", {}, [className])}
    />
  );
};

export default memo(ArticleTypeTabs);
