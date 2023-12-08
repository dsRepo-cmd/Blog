import React, { memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./AddCommentForm.module.scss";
import { useTranslation } from "react-i18next";
import { Input } from "shared/ui/Input/Input";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { useSelector } from "react-redux";
import {
  getAddCommentFormError,
  getAddCommentFormText,
} from "../../model/selectors/addCommentFormSelectors";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
  addCommentFormActions,
  addCommentFormReducer,
} from "../../model/slices/addCommentFormSlice";
import DynamicModuleLoader, {
  ReducerList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: ReducerList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm: React.FC<AddCommentFormProps> = ({
  className,
  onSendComment,
}) => {
  const { t } = useTranslation();
  const text = useSelector(getAddCommentFormText);
  const error = useSelector(getAddCommentFormError);
  const dispatch = useAppDispatch();

  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addCommentFormActions.setText(value));
    },
    [dispatch]
  );

  const onSendHandler = useCallback(() => {
    onSendComment(text || "");
    onCommentTextChange("");
  }, [onCommentTextChange, onSendComment, text]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.AddCommentForm, {}, [className])}>
        <Input
          className={cls.input}
          onChange={onCommentTextChange}
          value={text}
          placeholder={t("Enter text")}
        />
        <Button onClick={onSendHandler} theme={ButtonTheme.OUTLINE_INVERTED}>
          {t("Send")}
        </Button>
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(AddCommentForm);
