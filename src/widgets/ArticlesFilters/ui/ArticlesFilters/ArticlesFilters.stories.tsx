import type { Meta, StoryFn } from "@storybook/react";
import ArticlesFilters from "./ArticlesFilters";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { ArticleSortField, ArticleType } from "@/entities/Article";
import { VStack } from "@/shared/ui/Stack";

const meta = {
  component: ArticlesFilters,

  decorators: [
    (Story) => (
      <VStack align="center">
        <Story />
      </VStack>
    ),
    ThemeDecorator(),
    StoreDecorator({
      user: { authData: {} },
    }),
  ],
} satisfies Meta<typeof ArticlesFilters>;

export default meta;

const Template: StoryFn<typeof ArticlesFilters> = (args) => (
  <ArticlesFilters {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  sort: ArticleSortField.CREATED,
  type: ArticleType.ALL,
  order: "asc",
};
