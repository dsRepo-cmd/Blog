import React, { Suspense, memo, useCallback, useEffect } from "react";
import { classNames } from "@/shared/lib/classNames";

import { useTranslation } from "react-i18next";
import TextDeprecated, { TextSize } from "@/shared/ui/deprecated/Text/Text";

import { CommentList } from "@/entities/Comment";
import { useSelector } from "react-redux";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments";
import { getArticleComments } from "../../model/slices/articleDetailsCommentsSlice";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import Loader from "@/shared/ui/deprecated/Loader/Loader";
import { AddCommentForm } from "@/features/addCommentForm";
import Text from "@/shared/ui/redesigned/Text/Text";
import { ToggleFeatures } from "@/shared/lib/features";
import { VStack } from "@/shared/ui/redesigned/Stack";

interface ArticleDetailsCommentsProps {
  className?: string;
  id: string;
}

const ArticleDetailsComments: React.FC<ArticleDetailsCommentsProps> = ({
  className,
  id,
}) => {
  const { t } = useTranslation();
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const dispatch = useAppDispatch();

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch]
  );
  useEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  }, [dispatch]);

  return (
    <VStack gap="16" max className={classNames("", {}, [className])}>
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<Text size="l" title={t("Comments")} />}
        off={<TextDeprecated size={TextSize.L} title={t("Comments")} />}
      />
      <Suspense fallback={<Loader />}>
        <AddCommentForm onSendComment={onSendComment} />
      </Suspense>
      <CommentList isLoading={commentsIsLoading} comments={comments} />
    </VStack>
  );
};

export default memo(ArticleDetailsComments);
