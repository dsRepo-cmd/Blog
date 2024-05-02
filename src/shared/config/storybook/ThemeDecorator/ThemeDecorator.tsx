import { StoryFn } from "@storybook/react";

import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { Theme } from "@/shared/const/theme";
import "@/app/styles/index.scss";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { VStack } from "@/shared/ui/Stack";

export const ThemeDecorator = () => (StoryComponent: StoryFn) =>
  (
    <ThemeProvider initialTheme={Theme.LIGHT}>
      <VStack justify="end" align="end" padding="12">
        <ThemeSwitcher />
      </VStack>

      <StoryComponent />
    </ThemeProvider>
  );
