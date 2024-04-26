import React from "react";
import { RouterDecorator } from "../src/shared/config/storybook/RouterDecorator/RouterDecorator";
import { SuspenseDecorator } from "../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator";
import { FeaturesFlagsDecorator } from "../src/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator";

import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {},
  decorators: [
    (Story) => (
      <div className="app">
        <Story />
      </div>
    ),
    RouterDecorator,
    SuspenseDecorator,
    FeaturesFlagsDecorator({}),
  ],
};

export default preview;
