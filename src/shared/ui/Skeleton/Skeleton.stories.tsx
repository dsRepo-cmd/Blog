import type { Meta, StoryObj } from "@storybook/react";
import Skeleton from "./Skeleton";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { VStack } from "../Stack";

const meta = {
  component: Skeleton,

  decorators: [
    (Story) => (
      <VStack padding="12" align="center">
        <Story />
      </VStack>
    ),
    ThemeDecorator(),
    StoreDecorator({}),
  ],
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    width: "100%",
    height: 200,
  },
};

export const Circle: Story = {
  args: {
    border: "50%",
    width: 100,
    height: 100,
  },
};
