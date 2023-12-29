import React, { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "../EditableArticleCard/EditableArticleCard.module.scss";
import { useTranslation } from "react-i18next";
import { ArticleTextBlock } from "@/entities/Article";
import TextArea from "@/shared/ui/redesigned/TextArea/TextArea";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { articleEditActions } from "../../model/slice/ArticleEditSlice";
import Input from "@/shared/ui/redesigned/Input/Input";

import { Icon } from "@/shared/ui/redesigned/Icon/Icon";
import DeleteIcon from "@/shared/assets/icons/delete.svg";
import AddParagraphIcon from "@/shared/assets/icons/add-document.svg";

interface ArticleEditTextBlockComponentProps {
  className?: string;
  block?: ArticleTextBlock;
}

const ArticleEditTextBlockComponent: React.FC<
  ArticleEditTextBlockComponentProps
> = ({ className, block }) => {
  const { t } = useTranslation();
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
    (paragraph: string, index: number) => {
      const updatedParagraphs = [...(block?.paragraphs || [])];
      updatedParagraphs[index] = paragraph;

      dispatch(
        articleEditActions.updateArticleEditBlock({
          id: block?.id!,
          updatedBlock: {
            paragraphs: updatedParagraphs,
            paragraphIndex: index,
          },
        })
      );
    },
    [dispatch, block]
  );

  const onRemoveParagraph = useCallback(
    (index: number) => {
      dispatch(
        articleEditActions.removeParagraph({
          id: block?.id!,
          paragraphIndex: index,
        })
      );
    },
    [dispatch, block]
  );

  const onAddParagraph = useCallback(
    (paragraph: string) => {
      dispatch(
        articleEditActions.addParagraph({
          id: block?.id!,
          paragraph,
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
      <Icon
        className={cls.iconRemoveBlock}
        Svg={DeleteIcon}
        width={20}
        height={20}
        clickable
        onClick={onRemoveBlock}
      />
      <Input
        onDelete={() => onDeleteTitle}
        onChange={onChangeTitle}
        value={block?.title}
      />

      {block?.paragraphs.map((paragraph, index) => (
        <VStack max gap="12" key={index}>
          <TextArea
            onChange={(paragraph) => onChangeParagraph(paragraph, index)}
            cols={150}
            rows={5}
            value={paragraph}
            onDelete={() => onRemoveParagraph(index)}
          />
        </VStack>
      ))}
      <Icon
        className={cls.paragraphIcon}
        Svg={AddParagraphIcon}
        onClick={() => onAddParagraph("")}
        width={20}
        height={20}
        clickable
      />
    </VStack>
  );
};

export default memo(ArticleEditTextBlockComponent);
