import type { Meta, StoryFn } from "@storybook/react";
import ScrollToolbar from "./ScrollToolbar";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";

const meta = {
  component: ScrollToolbar,

  decorators: [
    (Story) => (
      <div style={{ height: "100svh" }}>
        <Story />
      </div>
    ),
    ThemeDecorator(),
    StoreDecorator({
      user: { authData: {} },
    }),
  ],
} satisfies Meta<typeof ScrollToolbar>;

export default meta;

const Template: StoryFn<typeof ScrollToolbar> = () => <ScrollToolbar />;

export const Primary = Template.bind({});
Primary.args = {};
