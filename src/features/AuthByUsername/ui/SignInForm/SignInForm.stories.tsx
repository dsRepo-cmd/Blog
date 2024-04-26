import type { Meta, StoryFn } from "@storybook/react";
import SignInForm from "./SignInForm";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { VStack } from "@/shared/ui/redesigned/Stack";

const meta = {
  component: SignInForm,

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
} satisfies Meta<typeof SignInForm>;

export default meta;

const Template: StoryFn<typeof SignInForm> = (args) => <SignInForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
