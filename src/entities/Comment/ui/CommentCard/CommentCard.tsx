import React, { memo } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./CommentCard.module.scss";
import { Comment } from "../../model/types/comment";
import Avatar from "shared/ui/Avatar/Avatar";
import Text from "shared/ui/Text/Text";
import Skeleton from "shared/ui/Skeleton/Skeleton";
import AppLink from "shared/ui/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";

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
  if (isLoading) {
    return (
      <div className={classNames(cls.CommentCard, {}, [className])}>
        <div className={cls.header}>
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton className={cls.username} width={100} height={16} />
        </div>
        <Skeleton className={cls.text} width={"100%"} />
      </div>
    );
  }

  if (!comment) {
    return null;
  }
  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <AppLink
        to={`${RoutePath.profile}${comment.user.id}`}
        className={cls.header}
      >
        {comment.user.avatar ? (
          <Avatar src={comment.user.avatar} size={30} />
        ) : null}
        <Text className={cls.username} title={comment.user.username} />
      </AppLink>
      <Text className={cls.text} text={comment.text} />
    </div>
  );
};

export default memo(CommentCard);
