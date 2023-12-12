import React, { FC, useMemo, useState, useEffect } from "react";
import { ThemeContext } from "@/shared/lib/context/ThemeContext";
import { Theme } from "@/shared/const/theme";
import { LOCAL_STORAGE_THEME_KEY } from "@/shared/const/localStorage";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const getInitialTheme = (): Theme => {
  const storedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;
  return storedTheme || Theme.LIGHT;
};

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  }, [theme]);

  const contextValue = useMemo(() => ({ theme, setTheme: setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
