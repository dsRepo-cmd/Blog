import React, { memo, useCallback, useEffect } from "react";
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
import { ArticleType } from "@/entities/Article";
import { renderArticleBlock } from "./renderBlock";

import Text from "@/shared/ui/redesigned/Text/Text";
import Skeleton from "@/shared/ui/redesigned/Skeleton/Skeleton";
import EditableArticleSidePanel from "../EditableArticlePanel/EditableArticlePanel";
import EditableArticlePanel from "../EditableArticlePanel/EditableArticlePanel";

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

  const types = [
    { value: ArticleType.ALL, content: ArticleType.ALL },
    { value: ArticleType.POLITICS, content: ArticleType.POLITICS },
    { value: ArticleType.ECONOMICS, content: ArticleType.ECONOMICS },
    { value: ArticleType.SCIENCE, content: ArticleType.SCIENCE },
    { value: ArticleType.IT, content: ArticleType.IT },
  ];

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
          id={id}
        />

        <Input
          value={formData?.title}
          label={t("Header")}
          onChange={onChangeTitle}
        />

        <Input
          value={formData?.subtitle}
          label={t("Subhead")}
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
      </VStack>
    </DynamicModuleLoader>
  );
};

export default memo(EditableArticleCard);
