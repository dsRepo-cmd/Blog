import { FC, memo } from "react";
import cls from "./ArticleListItem.module.scss";
import { classNames } from "@/shared/lib/classNames";
import Card from "@/shared/ui/Card/Card";
import { ArticleView } from "../../model/consts/consts";
import Skeleton from "@/shared/ui/Skeleton/Skeleton";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton: FC<ArticleListItemSkeletonProps> = memo(
  ({ className, view }) => {
    if (view === ArticleView.LIST) {
      return (
        <Card
          padding="0"
          max
          data-testid="ArticleListItem"
          className={classNames(cls.ArticleListItem, {}, [
            className,
            cls[view],
          ])}
        >
          <Skeleton border="0" width="100%" height={200} className={cls.img} />
          <VStack padding="16" max gap="16">
            <HStack justify={"between"} gap="8" max>
              <Skeleton
                width={32}
                height={32}
                border="50%"
                className={cls.avatar}
              />
              <Skeleton width={150} height={32} />
            </HStack>
            <Skeleton width={"80%"} height={32} />
            <Skeleton width={"100%"} height={100} />
            <HStack max align={"end"} justify={"end"}>
              <Skeleton width={50} height={32} />
            </HStack>
          </VStack>
        </Card>
      );
    }

    return (
      <Card
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
        border={"partial"}
        max
        padding={"0"}
      >
        <Skeleton border="0" width="100%" height={250} />

        <VStack
          maxHeight
          justify="between"
          padding="12"
          className={cls.info}
          gap="12"
        >
          <Skeleton width="100%" height={70} className={cls.img} />
          <HStack justify="between" max>
            <Skeleton
              width={32}
              height={32}
              border="50%"
              className={cls.avatar}
            />
            <Skeleton width={150} height={32} />
          </HStack>
          <VStack gap="4" className={cls.footer} max>
            <Skeleton width={50} height={32} />
          </VStack>
        </VStack>
      </Card>
    );
  }
);
