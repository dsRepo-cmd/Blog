import { Suspense, memo, useEffect } from "react";
import { classNames } from "@/shared/lib/classNames";
import { AppRouter } from "./providers/router";
import { Navbar } from "@/widgets/Navbar";
import { SideBar } from "@/widgets/SideBar";
import { useSelector } from "react-redux";
import { getUserInited, initAuthData } from "@/entities/User";
import useTheme from "@/shared/lib/hooks/useTheme/useTheme";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { MainLayout } from "@/shared/layouts/MainLayout";
import { AppLoaderLayout } from "@/shared/layouts/AppLoaderLayout";
import { useAppToolbar } from "./lib/useAppToolbar";
import { withTheme } from "./providers/ThemeProvider";

const App = memo(() => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserInited);
  const toolbar = useAppToolbar();

  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  if (!inited) {
    return (
      <div id="app" className={classNames("app_redesigned", {}, [theme])}>
        <AppLoaderLayout />
      </div>
    );
  }

  return (
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
  );
});

export default withTheme(App);
