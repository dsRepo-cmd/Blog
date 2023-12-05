import React, { memo } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./ArticleImageBlockComponent.module.scss";
import { useTranslation } from "react-i18next";
import { ArticleImageBlock } from "entities/Article/model/types/article";
import Text from "shared/ui/Text/Text";
import Icon from "shared/ui/Icon/Icon";

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

const ArticleImageBlockComponent: React.FC<ArticleImageBlockComponentProps> = ({
  className,
  block,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={classNames(cls.ArticleImageBlockComponent, {}, [className])}
    >
      <img src={block.src} alt={block.title} className={cls.img} />
      {block.title && <Text text={block.title} />}
    </div>
  );
};

export default memo(ArticleImageBlockComponent);
