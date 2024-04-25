import React from "react";
import { RouterDecorator } from "../src/shared/config/storybook/RouterDecorator/RouterDecorator";
import { SuspenseDecorator } from "../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator";
import { ThemeDecorator } from "../src/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { FeaturesFlagsDecorator } from "../src/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator";

import { Theme } from "../src/shared/const/theme";
import type { Preview } from "@storybook/react";

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
  decorators: [
    (Story) => <Story />,
    RouterDecorator,
    SuspenseDecorator,
    ThemeDecorator(Theme.LIGHT),
    FeaturesFlagsDecorator({}),
  ],
};

export default preview;
