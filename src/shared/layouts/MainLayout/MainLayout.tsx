import { memo, ReactElement } from "react";

import cls from "./MainLayout.module.scss";
import { classNames } from "@/shared/lib/classNames";
import { BrowserView, MobileOnlyView } from "react-device-detect";

interface MainLayoutProps {
  className?: string;
  header: ReactElement;
  content: ReactElement;
  sidebar: ReactElement;
  toolbar?: ReactElement;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  className,
  header,
  content,
  sidebar,
  toolbar,
}) => {
  return (
    <>
      <BrowserView>
        <div className={classNames(cls.MainLayout, {}, [className])}>
          <div className={cls.content}>{content}</div>
          <div className={cls.sidebar}>{sidebar}</div>
          <div className={cls.rightbar}>
            <div className={cls.header}>{header}</div>
            <div className={cls.toolbar}>{toolbar}</div>
          </div>
        </div>
      </BrowserView>
      <MobileOnlyView>
        <div className={cls.navbar}>
          <div className={cls.sidebar}>{sidebar}</div>
          <div className={cls.header}>{header}</div>
        </div>
        <div className={classNames(cls.MainLayoutMobile, {}, [className])}>
          <div className={cls.content}>{content}</div>
          {/* <div className={cls.toolbar}>{toolbar}</div> */}
          {/* <div className={cls.rightbar}></div> */}
        </div>
      </MobileOnlyView>
    </>
  );
};

export default memo(MainLayout);
