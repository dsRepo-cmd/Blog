import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import cls from "./ArticleImageBlockComponent.module.scss";
import { ArticleImageBlock } from "../../model/types/article";
import { classNames } from "@/shared/lib/classNames";
import TextDeprecated, { TextAlign } from "@/shared/ui/deprecated/Text/Text";
import { ToggleFeatures } from "@/shared/lib/features";
import Text from "@/shared/ui/redesigned/Text/Text";

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
      {block.title && (
        <ToggleFeatures
          feature="isAppRedesigned"
          on={<Text text={block.title} align="center" />}
          off={<TextDeprecated text={block.title} align={TextAlign.CENTER} />}
        />
      )}
    </div>
  );
};

export default memo(ArticleImageBlockComponent);
