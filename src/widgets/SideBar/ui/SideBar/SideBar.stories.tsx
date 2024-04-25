import type { Meta, StoryFn } from "@storybook/react";
import SideBar from "./SideBar";
import { Theme } from "@/shared/const/theme";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";

const meta = {
  component: SideBar,
  tags: ["autodocs"],
  argTypes: {
    className: {
      options: [Theme.LIGHT, Theme.DARK, Theme.ORANGE],
      control: { type: "select" },
    },
  },

  decorators: [(Story) => <Story />],
} satisfies Meta<typeof SideBar>;

export default meta;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

const Template: StoryFn<typeof SideBar> = (args) => <SideBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
  ThemeDecorator(Theme.LIGHT),
  StoreDecorator({
    user: { authData: {} },
  }),
];

export const Dark = Template.bind({});

Dark.args = {};
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    user: { authData: {} },
  }),
];

export const Orange = Template.bind({});
Orange.args = {};
Orange.decorators = [
  ThemeDecorator(Theme.ORANGE),
  StoreDecorator({
    user: { authData: {} },
  }),
];
