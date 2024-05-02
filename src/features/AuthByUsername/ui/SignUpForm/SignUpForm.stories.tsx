import type { Meta, StoryFn } from "@storybook/react";
import SignUpForm from "./SignUpForm";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { VStack } from "@/shared/ui/Stack";

const meta = {
  component: SignUpForm,

  decorators: [
    (Story) => (
      <VStack align="center">
        <Story />
      </VStack>
    ),
    ThemeDecorator(),
    StoreDecorator({
      user: { authData: { id: "1" } },
    }),
  ],
} satisfies Meta<typeof SignUpForm>;

export default meta;

const Template: StoryFn<typeof SignUpForm> = (args) => <SignUpForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
