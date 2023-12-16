import { Suspense, useEffect } from "react";
import { classNames } from "@/shared/lib/classNames";

import { AppRouter } from "./providers/router";
import { Navbar } from "@/widgets/Navbar";
import { SideBar } from "@/widgets/SideBar";
import { useSelector } from "react-redux";
import { getUserInited, initAuthData } from "@/entities/User";
import useTheme from "@/shared/lib/hooks/useTheme/useTheme";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { PageLoader } from "@/widgets/PageLoader";
import { ToggleFeatures } from "@/shared/lib/features/ui/ToggleFeatures/ToggleFeatures";
import { MainLayout } from "@/shared/layouts/MainLayout";
import { AppLoaderLayout } from "@/shared/layouts/AppLoaderLayout";
import { ScrollToTopButton } from "@/features/scrollToTopButton";
import { ScrollToolbar } from "@/widgets/ScrollToolbar";
import { useAppToolbar } from "./lib/useAppToolbar";

const App = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserInited);
  const toolbar = useAppToolbar();

  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  if (!inited) {
    return (
      <ToggleFeatures
        feature={"isAppRedesigned"}
        on={
          <div id="app" className={classNames("app_redesigned", {}, [theme])}>
            <AppLoaderLayout />
          </div>
        }
        off={<PageLoader />}
      />
    );
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      off={
        <div id="app" className={classNames("app", {}, [theme])}>
          <Suspense fallback="">
            <Navbar />
            <div className="content-page">
              <SideBar />
              <AppRouter />
            </div>
          </Suspense>
        </div>
      }
      on={
        <div id="app" className={classNames("app_redesigned", {}, [theme])}>
          <Suspense fallback="">
            <MainLayout
              header={<Navbar />}
              content={<AppRouter />}
              sidebar={<SideBar />}
              toolbar={toolbar}
            />
          </Suspense>
        </div>
      }
    />
  );
};

export default App;
