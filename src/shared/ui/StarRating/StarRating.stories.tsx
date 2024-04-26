import type { Meta, StoryObj } from "@storybook/react";
import StarRating from "./StarRating";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { VStack } from "../redesigned/Stack";

const meta = {
  component: StarRating,

  decorators: [
    (Story) => (
      <VStack align="center">
        <Story />
      </VStack>
    ),
    ThemeDecorator(),
    StoreDecorator({}),
  ],
} satisfies Meta<typeof StarRating>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    size: 50,
  },
};
