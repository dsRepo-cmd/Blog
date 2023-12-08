import React, { memo } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./ArticleTextBlockComponent.module.scss";
import { useTranslation } from "react-i18next";
import { ArticleTextBlock } from "../../model/types/article";
import Text from "shared/ui/Text/Text";

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

const ArticleTextBlockComponent: React.FC<ArticleTextBlockComponentProps> = ({
  className,
  block,
}) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
      {block.title && <Text title={block.title} className={cls.title} />}
      {block.paragraphs.map((paragraph) => (
        <Text key={paragraph} text={paragraph} className={cls.paragraph} />
      ))}
    </div>
  );
};

export default memo(ArticleTextBlockComponent);
