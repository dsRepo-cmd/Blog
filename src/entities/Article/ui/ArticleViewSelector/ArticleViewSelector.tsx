import React, { memo } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./ArticleViewSelector.module.scss";
import ListIcon from "shared/assets/icons/list-burger.svg";
import DetailsIcon from "shared/assets/icons/details.svg";

import { ArticleView } from "entities/Article/model/types/article";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import Icon from "shared/ui/Icon/Icon";

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}
const viewTypes = [
  {
    view: ArticleView.DETAILS,
    icon: DetailsIcon,
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
    <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button
          key={viewType.view}
          theme={ButtonTheme.CLEAR}
          onClick={onClick(viewType.view)}
        >
          <Icon
            width={24}
            height={24}
            Svg={viewType.icon}
            className={classNames(cls.icon, {
              [cls.selected]: viewType.view !== view,
            })}
          />
        </Button>
      ))}
    </div>
  );
};

export default memo(ArticleViewSelector);
