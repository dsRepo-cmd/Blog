import React, { memo, useCallback, useEffect } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./EditableArticleCard.module.scss";
import { useTranslation } from "react-i18next";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import DynamicModuleLoader, {
  ReducerList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
  articleEditActions,
  articleEditReducer,
} from "../../model/slice/ArticleEditSlice";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import {
  getArticleEditError,
  getArticleEditForm,
  getArticleEditIsLoading,
  getArticleEditReadonly,
  getArticleEditValidateErrors,
} from "../../model/selectors/getArticleEdit";
import { ValidateArticleEditError } from "../../model/consts/consts";
import { fetchArticleEditData } from "../../model/services/fetchArticleEditData";
import Input from "@/shared/ui/redesigned/Input/Input";
import { ListBox } from "@/shared/ui/redesigned/Popups";
import { ArticleBlockType, ArticleType } from "@/entities/Article";
import Button from "@/shared/ui/redesigned/Button/Button";
import { updateArticleEditData } from "../../model/services/updateArticleEditData";
import { renderArticleBlock } from "./renderBlock";

import Text from "@/shared/ui/redesigned/Text/Text";
import Loader from "@/shared/ui/redesigned/Loader/Loader";

interface EditableArticleCardProps {
  className?: string;
  id: string;
}
const reducers: ReducerList = {
  articleEdit: articleEditReducer,
};

const EditableArticleCard: React.FC<EditableArticleCardProps> = ({
  className,
  id,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const formData = useSelector(getArticleEditForm);
  const isLoading = useSelector(getArticleEditIsLoading);
  const error = useSelector(getArticleEditError);
  const readonly = useSelector(getArticleEditReadonly);
  const validateErrors = useSelector(getArticleEditValidateErrors);

  const validateErrorTranslates = {
    [ValidateArticleEditError.SERVER_ERROR]: t("Server error"),
    [ValidateArticleEditError.INCORRECT_USER_DATA]: t("Incorrect user data"),
    [ValidateArticleEditError.NO_DATA]: t("No data"),
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchArticleEditData(id));
    }
  }, [dispatch]);

  const onChangeTitle = useCallback(
    (value?: string) => {
      dispatch(articleEditActions.updateArticleEdit({ title: value || "" }));
    },
    [dispatch]
  );

  const onChangeSubtitle = useCallback(
    (value?: string) => {
      dispatch(articleEditActions.updateArticleEdit({ subtitle: value || "" }));
    },
    [dispatch]
  );

  const onChangeImg = useCallback(
    (value?: string) => {
      dispatch(articleEditActions.updateArticleEdit({ img: value || "" }));
    },
    [dispatch]
  );

  const onChangeType = useCallback(
    (type: ArticleType) => {
      dispatch(articleEditActions.updateArticleEdit({ type }));
    },
    [dispatch]
  );

  const onUpdate = useCallback(() => {
    dispatch(updateArticleEditData());
  }, [dispatch]);

  const types = [
    { value: ArticleType.ALL, content: ArticleType.ALL },
    { value: ArticleType.POLITICS, content: ArticleType.POLITICS },
    { value: ArticleType.ECONOMICS, content: ArticleType.ECONOMICS },
    { value: ArticleType.SCIENCE, content: ArticleType.SCIENCE },
    { value: ArticleType.IT, content: ArticleType.IT },
  ];

  const onAddTextBlock = useCallback(() => {
    dispatch(
      articleEditActions.addBlock({
        id: Date.now().toString(),
        type: ArticleBlockType.TEXT,
        paragraphs: [],
        title: "New Block Title",
      })
    );
  }, [dispatch]);

  const onAddCodeBlock = useCallback(() => {
    dispatch(
      articleEditActions.addBlock({
        id: Date.now().toString(),
        type: ArticleBlockType.CODE,
        code: "Type your code",
      })
    );
  }, [dispatch]);

  const onAddImageBlock = useCallback(() => {
    dispatch(
      articleEditActions.addBlock({
        id: Date.now().toString(),
        type: ArticleBlockType.IMAGE,
        src: "https://",
      })
    );
  }, [dispatch]);

  if (!types) null;

  if (error) {
    return (
      <>
        <Text title={error} variant={"error"} />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <VStack
        gap={"12"}
        className={classNames(cls.EditableArticleCard, {}, [className])}
      >
        <Input
          value={formData?.title}
          label={t("Title")}
          onChange={onChangeTitle}
        />

        <Input
          value={formData?.subtitle}
          label={t("Subtitle")}
          onChange={onChangeSubtitle}
        />

        <Input
          value={formData?.img}
          label={t("Image URL")}
          onChange={onChangeImg}
        />
        <ListBox
          label={t("Type")}
          onChange={onChangeType}
          items={types}
          value={formData?.type}
        />

        {formData?.blocks && formData?.blocks.map(renderArticleBlock)}
        <HStack
          gap={"12"}
          className={classNames(cls.ButtonsWrapper, {}, [className])}
        >
          <Button onClick={onUpdate}>{t("Update")}</Button>
          <Button onClick={onAddTextBlock}>{t("Add Text Block")}</Button>
          <Button onClick={onAddCodeBlock}>{t("Add Code Block")}</Button>
          <Button onClick={onAddImageBlock}>{t("Add Image Block")}</Button>
        </HStack>
      </VStack>
    </DynamicModuleLoader>
  );
};

export default memo(EditableArticleCard);
