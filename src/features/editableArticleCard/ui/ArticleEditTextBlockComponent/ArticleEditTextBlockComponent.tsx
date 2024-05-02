import React, { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "../EditableArticleCard/EditableArticleCard.module.scss";
import { useTranslation } from "react-i18next";
import { ArticleTextBlock } from "@/entities/Article";
import TextArea from "@/shared/ui/TextArea/TextArea";
import { HStack, VStack } from "@/shared/ui/Stack";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { articleEditActions } from "../../model/slice/ArticleEditSlice";
import Input from "@/shared/ui/Input/Input";

import { Icon } from "@/shared/ui/Icon/Icon";
import DeleteIcon from "@/shared/assets/icons/delete.svg";

interface ArticleEditTextBlockComponentProps {
  className?: string;
  block?: ArticleTextBlock;
}

const ArticleEditTextBlockComponent: React.FC<
  ArticleEditTextBlockComponentProps
> = ({ className, block }) => {
  const { t } = useTranslation("article");
  const dispatch = useAppDispatch();

  const onChangeTitle = useCallback(
    (value: string) => {
      dispatch(
        articleEditActions.updateArticleEditBlock({
          id: block?.id!,
          updatedBlock: { title: value },
        })
      );
    },
    [dispatch, block]
  );

  const onChangeParagraph = useCallback(
    (value: string) => {
      dispatch(
        articleEditActions.updateArticleEditBlock({
          id: block?.id!,
          updatedBlock: { paragraph: value },
        })
      );
    },
    [dispatch, block]
  );

  const onDeleteTitle = useCallback(() => {
    dispatch(
      articleEditActions.updateArticleEditBlock({
        id: block?.id!,
        updatedBlock: { title: undefined },
      })
    );
  }, [dispatch, block]);

  const onRemoveBlock = useCallback(() => {
    if (block?.id) {
      dispatch(articleEditActions.removeBlock(block.id));
    }
  }, [dispatch, block]);

  return (
    <VStack
      max
      gap={"12"}
      className={classNames(cls.ArticleEditTextBlockComponent, {}, [className])}
    >
      <Input
        placeholder={t("Title")}
        onDelete={() => onDeleteTitle}
        onChange={onChangeTitle}
        value={block?.title}
      />

      <TextArea
        placeholder={t("Text of the paragraph")}
        onChange={onChangeParagraph}
        cols={150}
        rows={5}
        value={block?.paragraph}
      />

      <HStack gap="12">
        <Icon
          className={cls.iconRemoveBlock}
          Svg={DeleteIcon}
          width={20}
          height={20}
          clickable
          onClick={onRemoveBlock}
        />
      </HStack>
    </VStack>
  );
};

export default memo(ArticleEditTextBlockComponent);
