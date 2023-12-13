import React from "react";
import type { Preview } from "@storybook/react";
import { Theme } from "../src/shared/const/theme";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className={Theme.DARK}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
