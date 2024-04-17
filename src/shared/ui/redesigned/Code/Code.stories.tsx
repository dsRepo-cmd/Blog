import type { Meta, StoryObj } from "@storybook/react";
import Code from "./Code";
import { Theme } from "@/shared/const/theme";

import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";

const meta = {
  component: Code,
  tags: ["autodocs"],

  argTypes: {
    className: {
      options: [Theme.LIGHT, Theme.DARK, Theme.ORANGE],
      control: { type: "select" },
    },
  },

  decorators: [(Story) => <Story />],
} satisfies Meta<typeof Code>;

export default meta;

type Story = StoryObj<typeof meta>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Deafault: Story = {
  args: {
    text: `console.log("Hello, World!");`,
  },
};

Deafault.decorators = [ThemeDecorator(Theme.LIGHT)];

export const Dark: Story = {
  args: {
    text: `console.log("Hello, World!");`,
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Orange: Story = {
  args: {
    text: `console.log("Hello, World!");`,
  },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];
