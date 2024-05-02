import type { Meta, StoryObj } from "@storybook/react";
import AppLogo from "./AppLogo";

import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { VStack } from "../Stack";

const meta = {
  component: AppLogo,

  decorators: [
    (Story) => (
      <VStack align="center">
        <Story />
      </VStack>
    ),
    ThemeDecorator(),
    StoreDecorator({}),
  ],
} satisfies Meta<typeof AppLogo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Deafault: Story = {
  args: {
    size: 50,
  },
};
