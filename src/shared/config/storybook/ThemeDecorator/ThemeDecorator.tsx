import { StoryFn } from "@storybook/react";

import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { Theme } from "@/shared/const/theme";
import "@/app/styles/index.scss";

export const ThemeDecorator = (theme: Theme) => (StoryComponent: StoryFn) =>
  (
    <ThemeProvider initialTheme={theme}>
      <div
        style={{ width: "100%", padding: "24px", height: "100%" }}
        className={`app ${theme}`}
      >
        <StoryComponent />
      </div>
    </ThemeProvider>
  );
