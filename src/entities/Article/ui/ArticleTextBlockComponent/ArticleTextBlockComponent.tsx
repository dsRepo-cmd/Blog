import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./ArticleTextBlockComponent.module.scss";
import { ArticleTextBlock } from "../../model/types/article";
import Text from "@/shared/ui/redesigned/Text/Text";

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

const ArticleTextBlockComponent: React.FC<ArticleTextBlockComponentProps> = ({
  className,
  block,
}) => {
  return (
    <div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
      {block.title && <Text title={block.title} className={cls.title} />}
      {block.paragraph && (
        <Text text={block.paragraph} className={cls.paragraph} />
      )}
    </div>
  );
};

export default memo(ArticleTextBlockComponent);
