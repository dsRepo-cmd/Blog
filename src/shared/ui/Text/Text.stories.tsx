import type { Meta, StoryObj } from "@storybook/react";
import Text from "./Text";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { VStack } from "../redesigned/Stack";

const meta = {
  component: Text,

  decorators: [
    (Story) => (
      <VStack padding="12" align="center">
        <Story />
      </VStack>
    ),
    ThemeDecorator(),
    StoreDecorator({}),
  ],
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    title: "Title",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate dolores, mollitia maxime eveniet deleniti soluta facere, aperiam laborum praesentium nisi excepturi distinctio quia accusamus minus totam veritatis temporibus ratione aliquam.",
  },
};
