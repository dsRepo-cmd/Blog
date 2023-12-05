import React, { memo, CSSProperties } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./Skeleton.module.scss";

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className,
  height,
  width,
  border,
}) => {
  const styles: CSSProperties = {
    width,
    height,
    borderRadius: border,
  };
  return (
    <div
      style={styles}
      className={classNames(cls.Skeleton, {}, [className])}
    ></div>
  );
};

export default memo(Skeleton);
