import type { Meta, StoryObj } from "@storybook/react";
import AppLogo from "./AppLogo";
import { Theme } from "@/shared/const/theme";

import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";

const meta = {
  component: AppLogo,
  tags: ["autodocs"],
  argTypes: {
    className: {
      options: [Theme.LIGHT, Theme.DARK, Theme.ORANGE],
      control: { type: "select" },
    },
  },

  decorators: [(Story) => <Story />],
} satisfies Meta<typeof AppLogo>;

export default meta;

type Story = StoryObj<typeof meta>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Deafault: Story = {
  args: {
    size: 50,
  },
};
Deafault.decorators = [ThemeDecorator(Theme.LIGHT)];

export const Dark: Story = {
  args: {
    size: 50,
  },
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Orange: Story = {
  args: {
    size: 50,
  },
};
Orange.decorators = [ThemeDecorator(Theme.ORANGE)];
