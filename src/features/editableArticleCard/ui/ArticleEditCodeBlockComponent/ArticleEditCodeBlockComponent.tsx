import React, { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "../EditableArticleCard/EditableArticleCard.module.scss";
import { useTranslation } from "react-i18next";
import { ArticleCodeBlock } from "@/entities/Article";
import TextArea from "@/shared/ui/redesigned/TextArea/TextArea";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { articleEditActions } from "../../model/slice/ArticleEditSlice";
import { VStack } from "@/shared/ui/redesigned/Stack";

import { Icon } from "@/shared/ui/redesigned/Icon/Icon";
import DeleteIcon from "@/shared/assets/icons/delete.svg";

interface ArticleEditCodeBlockComponentProps {
  className?: string;
  block: ArticleCodeBlock;
}

const ArticleEditCodeBlockComponent: React.FC<
  ArticleEditCodeBlockComponentProps
> = ({ className, block }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onChangeCode = useCallback(
    (code: string) => {
      const updatedBlock = {
        id: block.id,
        code,
      };

      dispatch(
        articleEditActions.updateArticleEditBlock({
          id: block.id,
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
      gap="12"
      max
      className={classNames(cls.ArticleEditCodeBlockComponent, {}, [className])}
    >
      <TextArea
        placeholder={t("Type your code")}
        onChange={onChangeCode}
        value={block.code}
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

export default memo(ArticleEditCodeBlockComponent);
