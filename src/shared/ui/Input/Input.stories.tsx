import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";
import { Theme } from "@/shared/const/theme";
import { VStack } from "../redesigned/Stack";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";

const meta = {
  component: Input,

  decorators: [
    (Story) => (
      <VStack padding="12" align="center">
        <Story />
      </VStack>
    ),
    ThemeDecorator(),
    StoreDecorator({}),
  ],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Deafault: Story = {
  args: {
    label: "LABEL",
    name: "text",
    placeholder: "Deafault",
  },
};
