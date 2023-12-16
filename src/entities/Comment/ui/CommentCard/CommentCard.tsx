import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./CommentCard.module.scss";
import { Comment } from "../../model/types/comment";
import SkeletonRedesigned from "@/shared/ui/redesigned/Skeleton/Skeleton";
import TextDeprecated from "@/shared/ui/deprecated/Text/Text";
import SkeletonDeprecated from "@/shared/ui/deprecated/Skeleton/Skeleton";
import AppLinkDeprecated from "@/shared/ui/deprecated/AppLink/AppLink";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { getRouteProfile } from "@/shared/const/router";
import AvatarDeprecated from "@/shared/ui/deprecated/Avatar/Avatar";
import Card from "@/shared/ui/redesigned/Card/Card";
import AppLink from "@/shared/ui/redesigned/AppLink/AppLink";
import Avatar from "@/shared/ui/redesigned/Avatar/Avatar";
import Text from "@/shared/ui/redesigned/Text/Text";
import { ToggleFeatures, toggleFeatures } from "@/shared/lib/features";

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
  const Skeleton = toggleFeatures({
    name: "isAppRedesigned",
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  });

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
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
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
      }
      off={
        <VStack
          data-testid="CommentCard.Content"
          gap="8"
          max
          className={classNames(cls.CommentCard, {}, [className])}
        >
          <AppLinkDeprecated
            to={getRouteProfile(comment.user.id)}
            className={cls.header}
          >
            {comment.user.avatar ? (
              <AvatarDeprecated size={30} src={comment.user.avatar} />
            ) : null}
            <TextDeprecated
              className={cls.username}
              title={comment.user.username}
            />
          </AppLinkDeprecated>
          <TextDeprecated className={cls.text} text={comment.text} />
        </VStack>
      }
    />
  );
};

export default memo(CommentCard);
