import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./ArticleViewSelector.module.scss";
import { ArticleView } from "../../../../entities/Article/model/consts/consts";
import Card from "@/shared/ui/Card/Card";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { Icon } from "@/shared/ui/Icon/Icon";
import ListIcon from "@/shared/assets/icons/burger.svg";
import TiledIcon from "@/shared/assets/icons/tile.svg";

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}
const viewTypes = [
  {
    view: ArticleView.DETAILS,
    icon: TiledIcon,
  },
  {
    view: ArticleView.LIST,
    icon: ListIcon,
  },
];
const ArticleViewSelector: React.FC<ArticleViewSelectorProps> = ({
  className,
  view,
  onViewClick,
}) => {
  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  };

  return (
    <Card
      className={classNames(cls.ArticleViewSelectorRedesigned, {}, [className])}
      border={"partial"}
    >
      <HStack gap="8">
        {viewTypes.map((viewType) => (
          <Icon
            clickable
            key={viewType.view}
            onClick={onClick(viewType.view)}
            Svg={viewType.icon}
            className={classNames("", {
              [cls.notSelected]: viewType.view !== view,
            })}
          />
        ))}
      </HStack>
    </Card>
  );
};

export default memo(ArticleViewSelector);
