import type { Meta, StoryFn } from "@storybook/react";
import ArticlesFilters from "./ArticlesFilters";
import { Theme } from "@/shared/const/theme";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { ArticleSortField, ArticleType } from "@/entities/Article";

const meta = {
  component: ArticlesFilters,
  tags: ["autodocs"],
  argTypes: {
    className: {
      options: [Theme.LIGHT, Theme.DARK, Theme.ORANGE],
      control: { type: "select" },
    },
  },

  decorators: [(Story) => <Story />],
} satisfies Meta<typeof ArticlesFilters>;

export default meta;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

const Template: StoryFn<typeof ArticlesFilters> = (args) => (
  <ArticlesFilters {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  sort: ArticleSortField.CREATED,
  type: ArticleType.ALL,
  order: "asc",
};
Primary.decorators = [
  ThemeDecorator(Theme.LIGHT),
  StoreDecorator({
    user: { authData: {} },
  }),
];

export const Dark = Template.bind({});

Dark.args = {
  sort: ArticleSortField.CREATED,
  type: ArticleType.ALL,
  order: "asc",
};
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    user: { authData: {} },
  }),
];

export const Orange = Template.bind({});
Orange.args = {
  sort: ArticleSortField.CREATED,
  type: ArticleType.ALL,
  order: "asc",
};
Orange.decorators = [
  ThemeDecorator(Theme.ORANGE),
  StoreDecorator({
    user: { authData: {} },
  }),
];
