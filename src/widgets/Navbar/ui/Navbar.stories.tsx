import type { Meta, StoryFn } from "@storybook/react";
import { Navbar } from "./Navbar";

import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { VStack } from "@/shared/ui/Stack";

const meta = {
  component: Navbar,

  decorators: [
    (Story) => (
      <VStack align="end">
        <Story />
      </VStack>
    ),
    ThemeDecorator(),
    StoreDecorator({
      user: { authData: { id: "1" } },
    }),
  ],
} satisfies Meta<typeof Navbar>;

export default meta;

const Template: StoryFn<typeof Navbar> = () => <Navbar />;

export const Primary = Template.bind({});
Primary.args = {};
