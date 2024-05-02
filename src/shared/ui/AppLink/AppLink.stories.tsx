import type { Meta, StoryObj } from "@storybook/react";
import AppLink from "./AppLink";

import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { VStack } from "../Stack";
import Text from "../Text/Text";
import Avatar from "../Avatar/Avatar";

const meta = {
  component: AppLink,

  decorators: [
    (Story) => (
      <VStack align="center">
        <Story />
      </VStack>
    ),
    ThemeDecorator(),
    StoreDecorator({}),
  ],
} satisfies Meta<typeof AppLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    to: "#",
    children: "Primary",
  },
};
