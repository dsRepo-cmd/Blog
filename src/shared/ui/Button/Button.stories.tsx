import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

import { VStack } from "../Stack";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";

const meta = {
  component: Button,

  decorators: [
    (Story) => (
      <VStack padding="24" align="center">
        <Story />
      </VStack>
    ),
    ThemeDecorator(),
    StoreDecorator({}),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Deafault: Story = {
  args: {
    variant: "filled",
    children: "Button",
  },
};

export const Clear: Story = {
  args: {
    variant: "clear",
    children: "Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Button",
  },
};

export const FullWidth: Story = {
  args: {
    variant: "filled",
    children: "Button",
    fullWidth: true,
  },
};
