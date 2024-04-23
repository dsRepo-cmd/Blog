import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import SignUpForm from "./SignUpForm";
import { Theme } from "@/shared/const/theme";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";

const meta = {
  component: SignUpForm,
  tags: ["autodocs"],
  argTypes: {
    className: {
      options: [Theme.LIGHT, Theme.DARK, Theme.ORANGE],
      control: { type: "select" },
    },
  },

  decorators: [(Story) => <Story />],
} satisfies Meta<typeof SignUpForm>;

export default meta;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

const Template: StoryFn<typeof SignUpForm> = (args) => <SignUpForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
  StoreDecorator({
    loginForm: { username: "dev@mail.com", password: "dsd5Rrrrr" },
  }),
  ThemeDecorator(Theme.LIGHT),
];

export const Dark = Template.bind({});

Dark.args = {};
Dark.decorators = [
  StoreDecorator({
    loginForm: { username: "dev@mail.com", password: "dsd5Rrrrr" },
  }),
  ThemeDecorator(Theme.DARK),
];

export const Orange = Template.bind({});
Orange.args = {};
Orange.decorators = [
  StoreDecorator({
    loginForm: { username: "dev@mail.com", password: "dsd5Rrrrr" },
  }),
  ThemeDecorator(Theme.ORANGE),
];
