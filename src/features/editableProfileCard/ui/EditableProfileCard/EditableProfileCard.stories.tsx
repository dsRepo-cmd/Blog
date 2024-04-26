import type { Meta, StoryFn } from "@storybook/react";
import { EditableProfileCard } from "./EditableProfileCard";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { VStack } from "@/shared/ui/redesigned/Stack";

const meta = {
  component: EditableProfileCard,

  decorators: [
    (Story) => (
      <VStack padding="12" align="center">
        <Story />
      </VStack>
    ),
    ThemeDecorator(),
    StoreDecorator({}),
  ],
} satisfies Meta<typeof EditableProfileCard>;

export default meta;

const Template: StoryFn<typeof EditableProfileCard> = (args) => (
  <EditableProfileCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
