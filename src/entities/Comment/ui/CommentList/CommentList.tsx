import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./CommentList.module.scss";
import CommentCard from "../CommentCard/CommentCard";
import { useTranslation } from "react-i18next";
import { Comment } from "../../model/types/comment";
import { VStack } from "@/shared/ui/redesigned/Stack";
import Text from "@/shared/ui/redesigned/Text/Text";

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

const CommentList: React.FC<CommentListProps> = ({
  className,
  comments,
  isLoading,
}) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <VStack
        gap="16"
        max
        className={classNames(cls.CommentList, {}, [className])}
      >
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>
    );
  }

  return (
    <VStack gap="16" max className={classNames("", {}, [className])}>
      {comments?.length ? (
        comments.map((comment) => (
          <CommentCard
            isLoading={isLoading}
            comment={comment}
            key={comment.id}
          />
        ))
      ) : (
        <Text text={t("No comments")} />
      )}
    </VStack>
  );
};

export default memo(CommentList);
