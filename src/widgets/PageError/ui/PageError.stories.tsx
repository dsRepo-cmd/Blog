import type { Meta, StoryFn } from "@storybook/react";
import PageError from "./PageError";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";

const meta = {
  component: PageError,

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
} satisfies Meta<typeof PageError>;

export default meta;

const Template: StoryFn<typeof PageError> = () => <PageError />;

export const Primary = Template.bind({});
Primary.args = {};
