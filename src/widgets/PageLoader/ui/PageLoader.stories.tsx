import type { Meta, StoryFn } from "@storybook/react";
import PageLoader from "./PageLoader";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";

const meta = {
  component: PageLoader,

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
} satisfies Meta<typeof PageLoader>;

export default meta;

const Template: StoryFn<typeof PageLoader> = () => <PageLoader />;

export const Primary = Template.bind({});
Primary.args = {};
