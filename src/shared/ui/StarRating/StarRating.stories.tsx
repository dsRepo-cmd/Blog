import type { Meta, StoryObj } from "@storybook/react";
import StarRating from "./StarRating";
import { Theme } from "@/shared/const/theme";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";

const meta = {
  component: StarRating,
  tags: ["autodocs"],

  argTypes: {
    className: {
      options: [Theme.LIGHT, Theme.DARK, Theme.ORANGE],
      control: { type: "select" },
    },
  },

  decorators: [(Story) => <Story />],
} satisfies Meta<typeof StarRating>;

export default meta;

type Story = StoryObj<typeof meta>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Normal: Story = {
  args: {
    size: 50,
  },
};
Normal.decorators = [ThemeDecorator(Theme.LIGHT)];

export const NormalDark: Story = {
  args: {
    size: 50,
  },
};
NormalDark.decorators = [ThemeDecorator(Theme.DARK)];

export const NormalOrange: Story = {
  args: {
    size: 50,
  },
};
NormalOrange.decorators = [ThemeDecorator(Theme.ORANGE)];
