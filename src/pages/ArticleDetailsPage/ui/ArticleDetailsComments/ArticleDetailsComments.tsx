import React, { Suspense, memo, useCallback, useEffect } from "react";
import { classNames } from "@/shared/lib/classNames";

import { useTranslation } from "react-i18next";
import Text from "@/shared/ui/deprecated/Text/Text";

import { CommentList } from "@/entities/Comment";
import { useSelector } from "react-redux";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments";
import { getArticleComments } from "../../model/slices/articleDetailsCommentsSlice";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import Loader from "@/shared/ui/deprecated/Loader/Loader";
import { AddCommentForm } from "@/features/addCommentForm";

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
    <div className={classNames("", {}, [className])}>
      <Text title={t("Comments")} />
      <Suspense fallback={<Loader />}>
        <AddCommentForm onSendComment={onSendComment} />
      </Suspense>
      <CommentList isLoading={commentsIsLoading} comments={comments} />
    </div>
  );
};

export default memo(ArticleDetailsComments);
