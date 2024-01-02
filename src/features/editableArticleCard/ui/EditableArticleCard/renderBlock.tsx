import { ArticleBlock, ArticleBlockType } from "@/entities/Article";
import cls from "./EditableArticleCard.module.scss";
import ArticleEditCodeBlockComponent from "../ArticleEditCodeBlockComponent/ArticleEditCodeBlockComponent";
import ArticleEditImageBlockComponent from "../ArticleEditImageBlockComponent/ArticleEditImageBlockComponent";
import ArticleEditTextBlockComponent from "../ArticleEditTextBlockComponent/ArticleEditTextBlockComponent";

export const renderArticleBlock = (block: ArticleBlock) => {
  switch (block.type) {
    case ArticleBlockType.CODE:
      return (
        <ArticleEditCodeBlockComponent
          key={block.id}
          block={block}
          className={cls.block}
        />
      );
    case ArticleBlockType.IMAGE:
      return (
        <ArticleEditImageBlockComponent
          key={block.id}
          block={block}
          className={cls.block}
        />
      );
    case ArticleBlockType.TEXT:
      return (
        <ArticleEditTextBlockComponent
          key={block.id}
          className={cls.block}
          block={block}
        />
      );
    default:
      return null;
  }
};
