import { memo } from "react";
import { HStack } from "@/shared/ui/Stack";
import { MainLayout } from "../MainLayout";
import cls from "./AppLoaderLayout.module.scss";
import Skeleton from "@/shared/ui/Skeleton/Skeleton";

const AppLoaderLayout = () => {
  return (
    <MainLayout
      header={
        <HStack className={cls.header}>
          <Skeleton width={40} height={40} border="50%" />
        </HStack>
      }
      content={<Skeleton height={"100%"} width={"100%"} />}
      sidebar={<Skeleton border="32px" width={220} height="100%" />}
    />
  );
};

export default memo(AppLoaderLayout);
