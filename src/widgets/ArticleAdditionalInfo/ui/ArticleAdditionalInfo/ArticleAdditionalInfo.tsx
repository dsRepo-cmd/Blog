import { FC, memo } from "react";
import { useTranslation } from "react-i18next";

import cls from "./ArticleAdditionalInfo.module.scss";
import { User } from "@/entities/User";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import Avatar from "@/shared/ui/redesigned/Avatar/Avatar";
import Text from "@/shared/ui/redesigned/Text/Text";
import Button from "@/shared/ui/redesigned/Button/Button";
import { classNames } from "@/shared/lib/classNames";
import { useSelector } from "react-redux";
import { getArticleDetailsIsLoading } from "@/entities/Article/model/selectors/articleDetails";
import Skeleton from "@/shared/ui/redesigned/Skeleton/Skeleton";

interface ArticleAdditionalInfoProps {
  className?: string;
  author: User;
  createdAt: string;
  views: number;
  onEdit: () => void;
}

const ArticleAdditionalInfo: FC<ArticleAdditionalInfoProps> = ({
  className,
  author,
  createdAt,
  views,
  onEdit,
}) => {
  const { t } = useTranslation();
  const isLoading = useSelector(getArticleDetailsIsLoading);

  if (isLoading) {
    return (
      <VStack
        max
        gap="32"
        className={classNames(cls.ArticleAdditionalInfo, {}, [className])}
      >
        <HStack gap="8">
          <Skeleton width={32} height={32} border={"50%"} />
          <Skeleton width={120} height={32} />
        </HStack>
        <Skeleton width={"80%"} height={40} />
        <Skeleton width={"80%"} height={16} />
      </VStack>
    );
  }

  return (
    <VStack
      gap="32"
      className={classNames(cls.ArticleAdditionalInfo, {}, [className])}
    >
      <HStack gap="8">
        <Avatar src={author.avatar} size={32} />
        <Text text={author.username} bold />
        <Text text={createdAt} />
      </HStack>
      <Button onClick={onEdit}>{t("Edit")}</Button>
      <Text text={t("{{count}} views", { count: views })} />
    </VStack>
  );
};

export default memo(ArticleAdditionalInfo);
