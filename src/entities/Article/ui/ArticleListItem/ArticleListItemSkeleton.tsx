import { FC, memo } from "react";
import cls from "./ArticleListItem.module.scss";
import { classNames } from "@/shared/lib/classNames";
import Card from "@/shared/ui/redesigned/Card/Card";
import { ArticleView } from "../../model/consts/consts";
import Skeleton from "@/shared/ui/redesigned/Skeleton/Skeleton";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton: FC<ArticleListItemSkeletonProps> = memo(
  ({ className, view }) => {
    const mainClass = cls.ArticleListItemRedesigned;

    if (view === ArticleView.LIST) {
      const cardContent = (
        <VStack max gap="12">
          <HStack max justify={"between"}>
            <HStack gap="8">
              <Skeleton border="50%" height={30} width={30} />
              <Skeleton width={150} height={16} />
            </HStack>
            <Skeleton width={150} height={16} />
          </HStack>

          <Skeleton width={350} height={24} />
          <Skeleton height={250} className={cls.img} />

          <Skeleton height={50} />
          <Skeleton height={36} width={200} />
        </VStack>
      );
      return (
        <Card padding="24" max border="round" className={cls.card}>
          {cardContent}
        </Card>
      );
    }

    const cardContent = (
      <VStack justify={"between"} max className={cls.cardContent}>
        <VStack max gap="12">
          <Skeleton
            width="100%"
            height={150}
            border="32px"
            className={cls.img}
          />
          <Skeleton height={80} />
        </VStack>
        <Skeleton width={150} height={16} className={cls.title} />
        <HStack gap="12">
          <Skeleton
            width={32}
            height={32}
            border="50%"
            className={cls.avatar}
          />
          <Skeleton width={50} height={16} className={cls.title} />
        </HStack>
      </VStack>
    );

    return (
      <VStack className={classNames(mainClass, {}, [className, cls[view]])}>
        <Card fullHeight max border="round" className={cls.card}>
          {cardContent}
        </Card>
      </VStack>
    );
  }
);
