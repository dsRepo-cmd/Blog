import { FC, memo, ReactElement } from "react";

import cls from "./StickyContentLayout.module.scss";
import { classNames } from "@/shared/lib/classNames";

interface StickyContentLayoutProps {
  className?: string;
  left?: ReactElement;
  content: ReactElement;
  right?: ReactElement;
}

const StickyContentLayout: FC<StickyContentLayoutProps> = ({
  className,
  content,
  left,
  right,
}) => {
  return (
    <div className={classNames(cls.MainLayout, {}, [className])}>
      {left && <div className={cls.left}>{left}</div>}
      <div className={cls.content}>{content}</div>
      {right && <div className={cls.right}>{right}</div>}
    </div>
  );
};

export default memo(StickyContentLayout);
