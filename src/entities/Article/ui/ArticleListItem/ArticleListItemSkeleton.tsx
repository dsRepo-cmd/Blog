import { FC, memo } from "react";
import cls from "./ArticleListItem.module.scss";

import { classNames } from "@/shared/lib/classNames";
import CardDeprecated from "@/shared/ui/deprecated/Card/Card";
import CardRedesigned from "@/shared/ui/redesigned/Card/Card";

import SkeletonDeprecated from "@/shared/ui/deprecated/Skeleton/Skeleton";
import SkeletonRedesigned from "@/shared/ui/redesigned/Skeleton/Skeleton";

import { VStack } from "@/shared/ui/redesigned/Stack";
import { ArticleView } from "../../model/consts/consts";
import { toggleFeatures } from "@/shared/lib/features/toggleFeatures";

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton: FC<ArticleListItemSkeletonProps> = memo(
  ({ className, view }) => {
    const mainClass = toggleFeatures({
      name: "isAppRedesigned",
      on: () => cls.ArticleListItemRedesigned,
      off: () => cls.ArticleListItem,
    });

    const Skeleton = toggleFeatures({
      name: "isAppRedesigned",
      on: () => SkeletonRedesigned,
      off: () => SkeletonDeprecated,
    });
    const Card = toggleFeatures({
      name: "isAppRedesigned",
      on: () => CardRedesigned,
      off: () => CardDeprecated,
    });

    if (view === ArticleView.LIST) {
      return (
        <div className={classNames(mainClass, {}, [className, cls[view]])}>
          <Card className={cls.card}>
            <div className={cls.header}>
              <Skeleton border="50%" height={30} width={30} />
              <Skeleton width={150} height={16} className={cls.username} />
              <Skeleton width={150} height={16} className={cls.date} />
            </div>
            <Skeleton width={250} height={24} className={cls.title} />
            <Skeleton height={200} className={cls.img} />
            <div className={cls.footer}>
              <Skeleton height={36} width={200} />
            </div>
          </Card>
        </div>
      );
    }

    return (
      <div className={classNames(mainClass, {}, [className, cls[view]])}>
        <Card className={cls.card}>
          <div className={cls.imageWrapper}>
            <Skeleton width={200} height={200} className={cls.img} />
          </div>
          <div className={cls.infoWrapper}>
            <Skeleton width={130} height={16} />
          </div>
          <Skeleton width={150} height={16} className={cls.title} />
        </Card>
      </div>
    );
  }
);
