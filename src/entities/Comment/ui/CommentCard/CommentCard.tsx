import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./CommentCard.module.scss";
import { Comment } from "../../model/types/comment";
import SkeletonRedesigned from "@/shared/ui/redesigned/Skeleton/Skeleton";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { getRouteProfile } from "@/shared/const/router";
import Card from "@/shared/ui/redesigned/Card/Card";
import AppLink from "@/shared/ui/redesigned/AppLink/AppLink";
import Avatar from "@/shared/ui/redesigned/Avatar/Avatar";
import Text from "@/shared/ui/redesigned/Text/Text";

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
  const Skeleton = SkeletonRedesigned;

  if (isLoading) {
    return (
      <VStack
        data-testid="CommentCard.Loading"
        gap="8"
        max
        className={classNames(cls.CommentCard, {}, [className, cls.loading])}
      >
        <div className={cls.header}>
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton height={16} width={100} className={cls.username} />
        </div>
        <Skeleton className={cls.text} width="100%" height={50} />
      </VStack>
    );
  }

  if (!comment) {
    return null;
  }
  return (
    <Card padding="24" border={"partial"} max>
      <VStack
        data-testid="CommentCard.Content"
        gap="8"
        max
        className={classNames(cls.CommentCardRedesigned, {}, [className])}
      >
        <AppLink to={getRouteProfile(comment.user.id)}>
          <HStack gap="8">
            {comment.user.avatar ? (
              <Avatar size={30} src={comment.user.avatar} />
            ) : null}
            <Text text={comment.user.username} bold />
          </HStack>
        </AppLink>
        <Text text={comment.text} />
      </VStack>
    </Card>
  );
};

export default memo(CommentCard);
