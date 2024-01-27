import { FC, memo, ReactElement } from "react";
import cls from "./StickyContentLayout.module.scss";
import { classNames } from "@/shared/lib/classNames";
import { BrowserView, MobileOnlyView } from "react-device-detect";

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
    <>
      <BrowserView>
        <div className={classNames(cls.StickyContentLayout, {}, [className])}>
          {left && <div className={cls.left}>{left}</div>}
          <div className={cls.content}>{content}</div>
          {right && <div className={cls.right}>{right}</div>}
        </div>
      </BrowserView>
      <MobileOnlyView>
        <div
          className={classNames(cls.StickyContentLayoutMobile, {}, [className])}
        >
          {right && <div className={cls.right}>{right}</div>}
          <div className={cls.content}>{content}</div>
        </div>
      </MobileOnlyView>
    </>
  );
};

export default memo(StickyContentLayout);
