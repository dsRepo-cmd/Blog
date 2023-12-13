import { Preview } from "@storybook/react";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { Theme } from "@/shared/const/theme";
import "@/app/styles/index.scss";

const ThemeDecorator: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider initialTheme={Theme.DARK}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default ThemeDecorator;
