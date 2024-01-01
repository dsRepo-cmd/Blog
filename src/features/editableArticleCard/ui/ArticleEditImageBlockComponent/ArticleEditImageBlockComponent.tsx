import React, { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "../EditableArticleCard/EditableArticleCard.module.scss";
import { useTranslation } from "react-i18next";
import { ArticleImageBlock } from "@/entities/Article";
import Input from "@/shared/ui/redesigned/Input/Input";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { articleEditActions } from "../../model/slice/ArticleEditSlice";
import { VStack } from "@/shared/ui/redesigned/Stack";

import DeleteIcon from "@/shared/assets/icons/delete.svg";
import { Icon } from "@/shared/ui/redesigned/Icon/Icon";

interface ArticleEditImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

const ArticleEditImageBlockComponent: React.FC<
  ArticleEditImageBlockComponentProps
> = ({ className, block }) => {
  const { t } = useTranslation("article");
  const dispatch = useAppDispatch();

  const onChangeSrc = useCallback(
    (src: string) => {
      const updatedBlock = {
        id: block.id!,
        src,
      };

      dispatch(
        articleEditActions.updateArticleEditBlock({
          id: block.id!,
          updatedBlock,
        })
      );
    },
    [dispatch, block.id]
  );

  const onChangeTitle = useCallback(
    (title: string) => {
      const updatedBlock = {
        id: block.id!,
        title,
      };

      dispatch(
        articleEditActions.updateArticleEditBlock({
          id: block.id!,
          updatedBlock,
        })
      );
    },
    [dispatch, block.id]
  );

  const onRemoveBlock = useCallback(() => {
    if (block?.id) {
      dispatch(articleEditActions.removeBlock(block.id));
    }
  }, [dispatch, block]);

  return (
    <VStack
      gap={"12"}
      max
      className={classNames(cls.ArticleEditImageBlockComponent, {}, [
        className,
      ])}
    >
      <img className={cls.img} src={block.src} alt={block.type} />
      <Input onChange={onChangeSrc} value={block?.src} />
      <Input
        placeholder={t("Title of image")}
        onChange={onChangeTitle}
        value={block?.title}
      />
      <Icon
        className={cls.iconRemoveBlock}
        Svg={DeleteIcon}
        width={20}
        height={20}
        clickable
        onClick={onRemoveBlock}
      />
    </VStack>
  );
};

export default memo(ArticleEditImageBlockComponent);
