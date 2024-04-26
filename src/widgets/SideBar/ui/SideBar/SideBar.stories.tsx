import type { Meta, StoryFn } from "@storybook/react";
import SideBar from "./SideBar";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";

const meta = {
  component: SideBar,

  decorators: [
    (Story) => (
      <div style={{ height: "100svh", padding: "12px" }}>
        <Story />
      </div>
    ),
    ThemeDecorator(),
    StoreDecorator({
      user: { authData: {} },
    }),
  ],
} satisfies Meta<typeof SideBar>;

export default meta;

const Template: StoryFn<typeof SideBar> = () => <SideBar />;

export const Primary = Template.bind({});
Primary.args = {};
