import type { Meta, StoryObj } from "@storybook/react";
import Loader from "./Loader";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { VStack } from "../redesigned/Stack";

const meta = {
  component: Loader,

  decorators: [
    (Story) => (
      <VStack align="center">
        <Story />
      </VStack>
    ),
    ThemeDecorator(),
    StoreDecorator({}),
  ],
} satisfies Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Deafault: Story = {
  args: {},
};
