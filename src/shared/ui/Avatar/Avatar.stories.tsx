import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "./Avatar";
import { Theme } from "@/shared/const/theme";
import { VStack } from "../redesigned/Stack";

const meta = {
  component: Avatar,
  tags: ["autodocs"],

  argTypes: {
    className: {
      options: [Theme.LIGHT, Theme.DARK, Theme.ORANGE],
      control: { type: "select" },
    },
  },

  decorators: [
    (Story) => (
      <VStack align="center" justify="center" className={Theme.LIGHT}>
        <Story />
      </VStack>
    ),
  ],
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Deafault: Story = {
  args: {
    size: 75,
    src: "",
  },
};
