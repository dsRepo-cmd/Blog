import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./ArticleCodeBlockComponent.module.scss";
import { ArticleCodeBlock } from "../../model/types/article";
import Code from "@/shared/ui/redesigned/Code/Code";

interface ArticleCodeBlockComponentProps {
  className?: string;
  block: ArticleCodeBlock;
}

const ArticleCodeBlockComponent: React.FC<ArticleCodeBlockComponentProps> = ({
  className,
  block,
}) => {
  return (
    <div className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>
      <Code text={block.code} />
    </div>
  );
};

export default memo(ArticleCodeBlockComponent);
