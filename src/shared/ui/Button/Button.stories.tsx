import type { Meta, StoryObj } from "@storybook/react";
import Button, { ButtonTheme } from "./Button";
import "@/app/styles/index.scss";
import "@/app/styles/themes/normal.scss";

import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { Theme } from "@/shared/const/theme";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "shared/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs

  // tags: ["autodocs"],

  // More on argTypes: https://storybook.js.org/docs/api/argtypes

  //   argTypes: {
  //     backgroundColor: { control: "color" },
  //   },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Primary: Story = {
  args: {
    children: "Button",
  },
  decorators: [
    (Story) => (
      <ThemeProvider initialTheme={Theme.DARK}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </ThemeProvider>
    ),
  ],
};

export const Clear: Story = {
  args: {
    children: "Button",
    theme: ButtonTheme.CLEAR,
  },
};

export const ClearInverted: Story = {
  args: {
    children: "Button",
    theme: ButtonTheme.CLEAR_INVERTED,
  },
};

export const Outline: Story = {
  args: {
    children: "Button",
    theme: ButtonTheme.OUTLINE,
  },
};

export const BackgroundInverted: Story = {
  args: {
    children: "Button",
    theme: ButtonTheme.BACKGROUND_INVERTED,
  },
};
export const BackgroundTheme: Story = {
  args: {
    children: "Button",
    theme: ButtonTheme.BACKGROUND,
  },
};
export const Disabled: Story = {
  args: {
    children: ">",
    theme: ButtonTheme.OUTLINE,
    disabled: true,
  },
};
export const Square: Story = {
  args: {
    children: ">",
    theme: ButtonTheme.BACKGROUND_INVERTED,
    square: true,
  },
};
