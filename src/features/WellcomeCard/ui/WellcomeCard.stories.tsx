import type { Meta, StoryFn } from "@storybook/react";
import WellcomeCard from "./WellcomeCard";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { VStack } from "@/shared/ui/Stack";

const meta = {
  component: WellcomeCard,

  decorators: [
    (Story) => (
      <VStack padding="12" align="center">
        <Story />
      </VStack>
    ),
    ThemeDecorator(),
    StoreDecorator({}),
  ],
} satisfies Meta<typeof WellcomeCard>;

export default meta;

const Template: StoryFn<typeof WellcomeCard> = (args) => (
  <WellcomeCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

export const IsLogin = Template.bind({});
IsLogin.args = {};
IsLogin.decorators = [
  StoreDecorator({
    user: { authData: { id: "1" } },
  }),
];
