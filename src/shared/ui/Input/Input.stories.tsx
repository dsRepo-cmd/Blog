import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";
import { Theme } from "@/shared/const/theme";
import { VStack } from "../redesigned/Stack";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";

const meta = {
  component: Input,
  tags: ["autodocs"],

  argTypes: {
    className: {
      options: [Theme.LIGHT, Theme.DARK, Theme.ORANGE],
      control: { type: "select" },
    },
  },

  decorators: [
    (Story) => (
      <VStack className={Theme.LIGHT}>
        <Story />
      </VStack>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Deafault: Story = {
  args: {
    label: "label",
    name: "text",
    placeholder: "Deafault",
  },
};

Deafault.decorators = [ThemeDecorator(Theme.DARK)];

export const Password: Story = {
  args: {
    label: "label",
    name: "password",
    placeholder: "Password",
    password: true,
  },
};
