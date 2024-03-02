import React, { memo } from "react";
import cls from "./ArticleImageBlockComponent.module.scss";
import { ArticleImageBlock } from "../../model/types/article";
import { classNames } from "@/shared/lib/classNames";
import Text from "@/shared/ui/redesigned/Text/Text";

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

const ArticleImageBlockComponent: React.FC<ArticleImageBlockComponentProps> = ({
  className,
  block,
}) => {
  return (
    <div
      className={classNames(cls.ArticleImageBlockComponent, {}, [className])}
    >
      <img src={block.src} alt={block.title} className={cls.img} />
      {block.title && <Text text={block.title} align="center" />}
    </div>
  );
};

export default memo(ArticleImageBlockComponent);
