import type { Meta, StoryObj } from "@storybook/react";
import AppLogo from "./AppLogo";
import { Theme } from "@/shared/const/theme";
import { VStack } from "../Stack";
import { classNames } from "@/shared/lib/classNames";

const meta = {
  component: AppLogo,

  argTypes: {
    className: {
      options: [Theme.LIGHT, Theme.DARK, Theme.ORANGE],
      control: { type: "select" },
    },
  },

  decorators: [
    (Story) => (
      <VStack max maxHeight className={Theme.LIGHT}>
        <Story />
      </VStack>
    ),
  ],
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
