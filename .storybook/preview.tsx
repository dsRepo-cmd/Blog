import React from "react";
import type { Preview } from "@storybook/react";

import "../src/app/styles/index.scss";

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        { name: "light_theme", value: "#eff5f6" },
        { name: "dark_theme", value: "#10191d" },
        { name: "app_orange_theme", value: "#f0c048" },
      ],
    },
  },
  decorators: [(Story) => <Story />],
};

export default preview;
