import type { Meta, StoryObj } from "@storybook/react";
import Toggle from "./Toggle";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { VStack } from "../Stack";

const meta = {
  component: Toggle,

  decorators: [
    (Story) => (
      <VStack align="center">
        <Story />
      </VStack>
    ),
    ThemeDecorator(),
    StoreDecorator({}),
  ],
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    label: "label",
  },
};
