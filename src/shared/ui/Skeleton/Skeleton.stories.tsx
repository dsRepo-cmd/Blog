import type { Meta, StoryObj } from "@storybook/react";
import Skeleton from "./Skeleton";
import { Theme } from "@/shared/const/theme";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";

const meta = {
  component: Skeleton,
  tags: ["autodocs"],

  argTypes: {
    className: {
      options: [Theme.LIGHT, Theme.DARK, Theme.ORANGE],
      control: { type: "select" },
    },
  },

  decorators: [(Story) => <Story />],
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Normal: Story = {
  args: {
    width: "100%",
    height: 200,
  },
};
Normal.decorators = [ThemeDecorator(Theme.LIGHT)];

export const NormalDark: Story = {
  args: {
    width: "100%",
    height: 200,
  },
};
NormalDark.decorators = [ThemeDecorator(Theme.DARK)];

export const NormalOrange: Story = {
  args: {
    width: "100%",
    height: 200,
  },
};
NormalOrange.decorators = [ThemeDecorator(Theme.ORANGE)];

export const Circle: Story = {
  args: {
    border: "50%",
    width: 100,
    height: 100,
  },
};

Circle.decorators = [ThemeDecorator(Theme.LIGHT)];

export const CircleDark: Story = {
  args: {
    border: "50%",
    width: 100,
    height: 100,
  },
};

CircleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const CircleOrange: Story = {
  args: {
    border: "50%",
    width: 100,
    height: 100,
  },
};

CircleOrange.decorators = [ThemeDecorator(Theme.ORANGE)];
