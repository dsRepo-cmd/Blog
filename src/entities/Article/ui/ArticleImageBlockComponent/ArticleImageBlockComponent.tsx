import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import cls from "./ArticleImageBlockComponent.module.scss";
import { ArticleImageBlock } from "../../model/types/article";
import { classNames } from "@/shared/lib/classNames";
import Text from "@/shared/ui/Text/Text";

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
