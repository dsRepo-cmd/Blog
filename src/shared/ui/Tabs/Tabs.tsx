import { FC, memo, ReactNode, useCallback } from "react";

import cls from "./Tabs.module.scss";
import { Flex, FlexDirection } from "../redesigned/Stack/Flex/Flex";
import { classNames } from "@/shared/lib/classNames";
import Card from "../Card/Card";

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
  direction?: FlexDirection;
}

const Tabs: FC<TabsProps> = ({
  className,
  tabs,
  onTabClick,
  value,
  direction = "row",
}) => {
  const clickHandle = useCallback(
    (tab: TabItem) => () => {
      onTabClick(tab);
    },
    [onTabClick]
  );

  return (
    <Flex
      direction={direction}
      gap="8"
      align="start"
      className={classNames(cls.Tabs, {}, [className])}
    >
      {tabs.map((tab) => {
        const isSelected = tab.value === value;
        return (
          <Card
            variant={isSelected ? "light" : "normal"}
            className={classNames(cls.tab, {
              [cls.selected]: isSelected,
            })}
            key={tab.value}
            onClick={clickHandle(tab)}
            border={"normal"}
          >
            {tab.content}
          </Card>
        );
      })}
    </Flex>
  );
};

export default memo(Tabs);
