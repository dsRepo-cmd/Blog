import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import { Theme } from "@/shared/const/theme";
import { VStack } from "../redesigned/Stack";

const meta = {
  component: Button,
  tags: ["autodocs"],

  argTypes: {
    variant: {
      options: ["clear", "outline", "filled"],
      control: { type: "select" }, // Automatically inferred when 'options' is defined
    },
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
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Deafault: Story = {
  args: {
    variant: "filled",
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
