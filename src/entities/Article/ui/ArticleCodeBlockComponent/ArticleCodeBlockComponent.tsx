import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./ArticleCodeBlockComponent.module.scss";
import { useTranslation } from "react-i18next";
import { ArticleCodeBlock } from "../../model/types/article";
import Code from "@/shared/ui/Code/Code";

interface ArticleCodeBlockComponentProps {
  className?: string;
  block: ArticleCodeBlock;
}

const ArticleCodeBlockComponent: React.FC<ArticleCodeBlockComponentProps> = ({
  className,
  block,
}) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>
      <Code text={block.code} />
    </div>
  );
};

export default memo(ArticleCodeBlockComponent);
