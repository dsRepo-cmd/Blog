import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "./Avatar";
import { Theme } from "@/shared/const/theme";

import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";

const meta = {
  component: Avatar,
  tags: ["autodocs"],

  argTypes: {
    className: {
      options: [Theme.LIGHT, Theme.DARK, Theme.ORANGE],
      control: { type: "select" },
    },
  },

  decorators: [(Story) => <Story />],
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Deafault: Story = {
  args: {
    size: 50,
    src: "",
  },
};

Deafault.decorators = [ThemeDecorator(Theme.LIGHT)];

export const Dark: Story = {
  args: {
    size: 50,
    src: "",
  },
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Orange: Story = {
  args: {
    size: 50,
    src: "",
  },
};
Orange.decorators = [ThemeDecorator(Theme.ORANGE)];
