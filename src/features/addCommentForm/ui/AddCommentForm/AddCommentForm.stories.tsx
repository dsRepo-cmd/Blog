import type { Meta, StoryFn } from "@storybook/react";
import AddCommentForm from "./AddCommentForm";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { VStack } from "@/shared/ui/Stack";

const meta = {
  component: AddCommentForm,

  decorators: [
    (Story) => (
      <VStack padding="12" align="center">
        <Story />
      </VStack>
    ),
    ThemeDecorator(),
    StoreDecorator({
      user: { authData: { id: "1" } },
    }),
  ],
} satisfies Meta<typeof AddCommentForm>;

export default meta;

const Template: StoryFn<typeof AddCommentForm> = (args) => (
  <AddCommentForm {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
