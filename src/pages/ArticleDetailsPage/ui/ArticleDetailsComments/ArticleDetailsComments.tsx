import React, { memo, useCallback, useEffect } from "react";
import { classNames } from "shared/lib/classNames";

import { useTranslation } from "react-i18next";
import Text from "shared/ui/Text/Text";
import { AddCommentForm } from "features/addCommentForm";
import { CommentList } from "entities/Comment";
import { useSelector } from "react-redux";
import { addCommentForArticle } from "pages/ArticleDetailsPage/model/services/addCommentForArticle/addCommentForArticle";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getArticleCommentsIsLoading } from "pages/ArticleDetailsPage/model/selectors/comments";
import { getArticleComments } from "pages/ArticleDetailsPage/model/slices/articleDetailsCommentsSlice";
import { fetchCommentsByArticleId } from "pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";

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
      <AddCommentForm onSendComment={onSendComment} />
      <CommentList isLoading={commentsIsLoading} comments={comments} />
    </div>
  );
};

export default memo(ArticleDetailsComments);
