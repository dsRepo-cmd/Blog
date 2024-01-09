import React, { memo, useCallback, useEffect, useState } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./EditableArticleCard.module.scss";
import { useTranslation } from "react-i18next";
import { VStack } from "@/shared/ui/redesigned/Stack";
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
  getArticleEditData,
  getArticleEditError,
  getArticleEditForm,
  getArticleEditIsLoading,
  getArticleEditValidateErrors,
} from "../../model/selectors/getArticleEdit";
import { ValidateArticleEditError } from "../../model/consts/consts";
import { fetchArticleEditData } from "../../model/services/fetchArticleEditData";
import Input from "@/shared/ui/redesigned/Input/Input";
import { ListBox } from "@/shared/ui/redesigned/Popups";
import { ArticleType } from "@/entities/Article";
import { renderArticleBlock } from "./renderBlock";
import Text from "@/shared/ui/redesigned/Text/Text";
import Skeleton from "@/shared/ui/redesigned/Skeleton/Skeleton";
import EditableArticlePanel from "../EditableArticlePanel/EditableArticlePanel";
import { useParams } from "react-router-dom";

interface EditableArticleCardProps {
  className?: string;

  create?: boolean;
}
const reducers: ReducerList = {
  articleEdit: articleEditReducer,
};

const EditableArticleCard: React.FC<EditableArticleCardProps> = ({
  className,
  create,
}) => {
  const { t } = useTranslation("article");

  const dispatch = useAppDispatch();
  const formData = useSelector(getArticleEditForm);
  const isLoading = useSelector(getArticleEditIsLoading);

  const error = useSelector(getArticleEditError);
  const { id } = useParams<{ id: string }>();

  if (!create) {
    useEffect(() => {
      if (id) {
        dispatch(fetchArticleEditData(id));
      }
    }, [dispatch]);
  }

  // Validate errors
  const validateErrors = useSelector(getArticleEditValidateErrors);

  const validateErrorTranslates: { [key: string]: string } = {
    [ValidateArticleEditError.SERVER_ERROR]: t("Server error"),
    [ValidateArticleEditError.INCORRECT_TITLE]: t("Incorrect title"),
    [ValidateArticleEditError.INCORRECT_SUBTITLE]: t("Incorrect subtitle"),
    [ValidateArticleEditError.INCORRECT_IMAGE_URL]: t("Incorrect image URL"),
    [ValidateArticleEditError.INCORRECT_BLOCKS_DATA]: t(
      "Incorrect blocks data"
    ),
    [ValidateArticleEditError.NO_DATA]: t("No data"),
  };

  ////

  const type = formData?.type ? formData?.type : ArticleType.ALL;

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

  const types = [
    { value: ArticleType.ALL, content: ArticleType.ALL },
    { value: ArticleType.POLITICS, content: ArticleType.POLITICS },
    { value: ArticleType.ECONOMICS, content: ArticleType.ECONOMICS },
    { value: ArticleType.SCIENCE, content: ArticleType.SCIENCE },
    { value: ArticleType.IT, content: ArticleType.IT },
  ];

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
        <VStack gap={"8"}>
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} width={100} />
          <Skeleton height={200} />
          <Skeleton height={200} />
          <Skeleton height={200} />
        </VStack>
      </>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <VStack
        gap={"8"}
        className={classNames(cls.EditableArticleCard, {}, [className])}
      >
        <EditableArticlePanel
          className={classNames(cls.panel, {}, [className])}
        />

        <Input
          value={formData?.title}
          label={t("Header")}
          onChange={onChangeTitle}
          error={
            validateErrors?.title &&
            validateErrorTranslates[validateErrors?.title]
          }
        />

        <Input
          value={formData?.subtitle}
          label={t("Subhead")}
          onChange={onChangeSubtitle}
          error={
            validateErrors?.subtitle &&
            validateErrorTranslates[validateErrors?.subtitle]
          }
        />

        <Input
          value={formData?.img}
          label={t("Image URL")}
          onChange={onChangeImg}
          error={
            validateErrors?.imageUrl &&
            validateErrorTranslates[validateErrors?.imageUrl]
          }
        />
        <ListBox
          label={t("Type")}
          onChange={onChangeType}
          items={types}
          value={type}
        />

        {validateErrors?.blocks && (
          <Text
            variant={"error"}
            text={validateErrorTranslates[validateErrors?.blocks]}
          />
        )}

        {validateErrors?.data && (
          <Text
            variant={"error"}
            text={validateErrorTranslates[validateErrors?.data]}
          />
        )}

        {formData?.blocks && formData?.blocks.map(renderArticleBlock)}
      </VStack>
    </DynamicModuleLoader>
  );
};

export default memo(EditableArticleCard);
