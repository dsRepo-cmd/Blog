import React, {
  memo,
  ReactNode,
  useRef,
  MutableRefObject,
  UIEvent,
  useEffect,
} from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./Page.module.scss";
import { useInfiniteScroll } from "@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getSaveScrollByPath, scrollSaveActions } from "@/features/ScrollSave";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { StateSchema } from "@/app/providers/StoreProvider";
import { useThrottle } from "@/shared/lib/hooks/useThrottle/useThrottle";
import { TestProps } from "@/shared/types/tests";
import { toggleFeatures } from "@/shared/lib/features/toggleFeatures";

interface PageProps extends TestProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

const Page: React.FC<PageProps> = (props) => {
  const { className, children, onScrollEnd } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const scrollPosition = useSelector((state: StateSchema) =>
    getSaveScrollByPath(state, pathname)
  );

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });

  useEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  }, [scrollPosition]);

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(
      scrollSaveActions.setScrollPosition({
        position: e.currentTarget.scrollTop,
        path: pathname,
      })
    );
  }, 500);

  return (
    <main
      onScroll={onScroll}
      ref={wrapperRef}
      className={classNames(
        toggleFeatures({
          name: "isAppRedesigned",
          on: () => cls.PageRedesigned,
          off: () => cls.Page,
        }),
        {},
        [className]
      )}
      data-testid={props["data-testid"] ?? "Page"}
    >
      {children}
      {onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null}
    </main>
  );
};

export default memo(Page);
