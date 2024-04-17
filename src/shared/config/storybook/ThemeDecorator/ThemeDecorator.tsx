import { StoryFn } from "@storybook/react";

import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { Theme } from "@/shared/const/theme";
import "@/app/styles/index.scss";

export const ThemeDecorator = (theme: Theme) => (StoryComponent: StoryFn) =>
  (
    <ThemeProvider initialTheme={theme}>
      <div className={`app_storybook ${theme}`}>
        <StoryComponent />
      </div>
    </ThemeProvider>
  );
