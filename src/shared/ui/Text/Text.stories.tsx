import type { Meta, StoryObj } from "@storybook/react";
import Text from "./Text";
import { Theme } from "@/shared/const/theme";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";

const meta = {
  component: Text,
  tags: ["autodocs"],

  argTypes: {
    className: {
      options: [Theme.LIGHT, Theme.DARK, Theme.ORANGE],
      control: { type: "select" },
    },
  },

  decorators: [(Story) => <Story />],
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Normal: Story = {
  args: {
    title: "Title",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate dolores, mollitia maxime eveniet deleniti soluta facere, aperiam laborum praesentium nisi excepturi distinctio quia accusamus minus totam veritatis temporibus ratione aliquam.",
  },
};
Normal.decorators = [ThemeDecorator(Theme.LIGHT)];

export const NormalDark: Story = {
  args: {
    title: "Title",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate dolores, mollitia maxime eveniet deleniti soluta facere, aperiam laborum praesentium nisi excepturi distinctio quia accusamus minus totam veritatis temporibus ratione aliquam.",
  },
};
NormalDark.decorators = [ThemeDecorator(Theme.DARK)];

export const NormalOrange: Story = {
  args: {
    title: "Title",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate dolores, mollitia maxime eveniet deleniti soluta facere, aperiam laborum praesentium nisi excepturi distinctio quia accusamus minus totam veritatis temporibus ratione aliquam.",
  },
};
NormalOrange.decorators = [ThemeDecorator(Theme.ORANGE)];
