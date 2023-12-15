import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./ArticleTextBlockComponent.module.scss";
import { useTranslation } from "react-i18next";
import { ArticleTextBlock } from "../../model/types/article";
import TextDeprecated from "@/shared/ui/deprecated/Text/Text";
import { ToggleFeatures } from "@/shared/lib/features";
import Text from "@/shared/ui/redesigned/Text/Text";

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
      {block.title && (
        <ToggleFeatures
          feature="isAppRedesigned"
          on={<Text title={block.title} className={cls.title} />}
          off={<TextDeprecated title={block.title} className={cls.title} />}
        />
      )}
      {block.paragraphs.map((paragraph, index) => (
        <ToggleFeatures
          feature="isAppRedesigned"
          on={
            <Text key={paragraph} text={paragraph} className={cls.paragraph} />
          }
          off={
            <TextDeprecated
              key={paragraph}
              text={paragraph}
              className={cls.paragraph}
            />
          }
        />
      ))}
    </div>
  );
};

export default memo(ArticleTextBlockComponent);
