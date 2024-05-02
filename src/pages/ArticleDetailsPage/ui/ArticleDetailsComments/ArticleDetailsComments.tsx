import React, { Suspense, memo, useCallback, useEffect, useState } from "react";
import { classNames } from "@/shared/lib/classNames";
import { useTranslation } from "react-i18next";
import { CommentList } from "@/entities/Comment";
import { useSelector } from "react-redux";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments";
import { getArticleComments } from "../../model/slices/articleDetailsCommentsSlice";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import Loader from "@/shared/ui/Loader/Loader";
import { AddCommentForm } from "@/features/addCommentForm";
import Text from "@/shared/ui/Text/Text";
import { VStack } from "@/shared/ui/Stack";
import { getUserAuthData } from "@/entities/User";
import Modal from "@/shared/ui/Modal/Modal";
import Card from "@/shared/ui/Card/Card";

interface ArticleDetailsCommentsProps {
  className?: string;
  id: string;
}

const ArticleDetailsComments: React.FC<ArticleDetailsCommentsProps> = ({
  className,
  id,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const dispatch = useAppDispatch();
  const userData = useSelector(getUserAuthData);

  const onSendComment = useCallback(
    (text: string) => {
      if (userData) {
        dispatch(addCommentForArticle(text));
      } else {
        setIsModalOpen(true);
      }
    },
    [dispatch]
  );
  useEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  }, [dispatch]);

  return (
    <VStack gap="16" max className={classNames("", {}, [className])}>
      <Text size="l" title={t("Comments")} />
      <Suspense fallback={<Loader />}>
        <AddCommentForm onSendComment={onSendComment} />
      </Suspense>
      <CommentList isLoading={commentsIsLoading} comments={comments} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Card variant="outlined" padding="24">
          <Text title={t("Please register to write comments")} />
        </Card>
      </Modal>
    </VStack>
  );
};

export default memo(ArticleDetailsComments);
