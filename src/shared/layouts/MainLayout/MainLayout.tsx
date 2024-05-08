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
  footer?: ReactElement;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  className,
  header,
  content,
  sidebar,
  toolbar,
  footer,
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
          <footer>{footer}</footer>
        </div>
      </BrowserView>

      <MobileOnlyView>
        <div className={classNames(cls.MainLayoutMobile, {}, [className])}>
          <div className={cls.navbar}>
            <div className={cls.sidebar}>{sidebar}</div>
            <div className={cls.header}>{header}</div>
          </div>
          <div className={cls.contentWrapper}>
            <div className={cls.content}>{content}</div>
            <div className={cls.toolbar}>{toolbar}</div>
          </div>
          <footer className={cls.footer}>{footer}</footer>
        </div>
      </MobileOnlyView>
    </>
  );
};

export default memo(MainLayout);
