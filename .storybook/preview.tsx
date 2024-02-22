import React from "react";
import type { Preview } from "@storybook/react";
import "@/app/styles/index.scss";

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        { name: "app_light_theme", value: "#eff5f6" },
        { name: "app_dark_theme", value: "#10191d" },
        { name: "app_orange_theme", value: "#f0c048" },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: "100%" }} className="app">
        <Story />
      </div>
    ),
  ],
};

export default preview;
