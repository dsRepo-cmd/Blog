import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";

import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { VStack } from "../redesigned/Stack";
import EyeIcon from "@/shared/assets/icons/eye-r.svg";

const meta = {
  component: Icon,

  decorators: [
    (Story) => (
      <VStack padding="12" align="center">
        <Story />
      </VStack>
    ),
    ThemeDecorator(),
    StoreDecorator({}),
  ],
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Deafault: Story = {
  args: {
    Svg: EyeIcon,
    width: 50,
  },
};

export const Clickable: Story = {
  args: {
    Svg: EyeIcon,
    width: 50,
    clickable: true,
    onClick: () => {
      console.log("clicked");
    },
  },
};
