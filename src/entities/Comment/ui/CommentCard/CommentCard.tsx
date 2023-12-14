import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./CommentCard.module.scss";
import { Comment } from "../../model/types/comment";

import Text from "@/shared/ui/deprecated/Text/Text";
import Skeleton from "@/shared/ui/deprecated/Skeleton/Skeleton";
import AppLink from "@/shared/ui/deprecated/AppLink/AppLink";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { getRouteProfile } from "@/shared/const/router";
import Avatar from "@/shared/ui/deprecated/Avatar/Avatar";

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

const CommentCard: React.FC<CommentCardProps> = ({
  className,
  comment,
  isLoading,
}) => {
  // isLoading = true;
  if (isLoading) {
    return (
      <VStack
        gap={"12"}
        max
        className={classNames(cls.CommentCard, {}, [className])}
      >
        <VStack gap={"12"} max>
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton width={100} height={16} />
        </VStack>
        <Skeleton width={"100%"} />
      </VStack>
    );
  }

  if (!comment) {
    return null;
  }
  return (
    <VStack
      gap={"12"}
      max
      className={classNames(cls.CommentCard, {}, [className])}
    >
      <AppLink to={getRouteProfile(comment.user.id)}>
        {comment.user.avatar ? (
          <Avatar src={comment.user.avatar} size={30} />
        ) : null}
        <Text title={comment.user.username} />
      </AppLink>
      <Text text={comment.text} />
    </VStack>
  );
};

export default memo(CommentCard);
