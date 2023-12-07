import React, { memo, ReactNode, useCallback, useMemo } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./Tabs.module.scss";
import Card, { CardTheme } from "../Card/Card";
import { ArticleType } from "entities/Article/model/types/article";

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
}

interface TabsProps {
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ className, tabs, value, onTabClick }) => {
  const clickHandle = useCallback(
    (tab: TabItem) => () => {
      onTabClick(tab);
    },
    [onTabClick]
  );

  return (
    <div className={classNames(cls.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
          className={cls.tab}
          key={tab.value}
          onClick={clickHandle(tab)}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  );
};

export default memo(Tabs);
