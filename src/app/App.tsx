import { Suspense, useEffect } from "react";
import { classNames } from "@/shared/lib/classNames";

import { AppRouter } from "./providers/router";
import { Navbar } from "@/widgets/Navbar";
import { SideBar } from "@/widgets/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getUserInited, useJsonSettings, userActions } from "@/entities/User";
import useTheme from "@/shared/lib/hooks/useTheme/useTheme";

const App = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const inited = useSelector(getUserInited);

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames("app", {}, [theme])}>
      <Suspense fallback="">
        <Navbar />

        <div className="content-page">
          <SideBar />
          {inited && <AppRouter />}
        </div>
      </Suspense>
    </div>
  );
};

export default App;
