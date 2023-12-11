import React from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./PageLoader.module.scss";
import Loader from "@/shared/ui/Loader/Loader";

interface PageLoaderProps {
  className?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  className,
}: PageLoaderProps) => {
  return (
    <div className={classNames(cls.PageLoader, {}, [className])}>
      <Loader />
    </div>
  );
};

export default PageLoader;
