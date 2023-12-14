import { CSSProperties, FC, memo } from "react";

import cls from "./Skeleton.module.scss";
import { classNames } from "@/shared/lib/classNames";

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: string;
}

const Skeleton: FC<SkeletonProps> = memo((props) => {
  const { className, height, width, border } = props;

  const styles: CSSProperties = {
    width,
    height,
    borderRadius: border,
  };

  return (
    <div className={classNames(cls.Skeleton, {}, [className])} style={styles} />
  );
});

export default Skeleton;
