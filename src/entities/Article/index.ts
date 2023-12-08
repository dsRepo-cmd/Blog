import ArticleDetails from "./ui/ArticleDetails/ArticleDetails";
import { Article } from "./model/types/article";
import { ArticleDetailsSchema } from "./model/types/articleDetailsSchema";
import ArticleViewSelector from "./ui/ArticleViewSelector/ArticleViewSelector";
import ArticleTypeTabs from "./ui/ArticleTypeTabs/ArticleTypeTabs";
import { getArticleDetailsData } from "./model/selectors/articleDetails";
import {
  ArticleView,
  ArticleSortField,
  ArticleType,
} from "./model/consts/consts";

export {
  ArticleSortField,
  ArticleView,
  getArticleDetailsData,
  ArticleType,
  ArticleDetails,
  ArticleViewSelector,
  ArticleTypeTabs,
};
export type { Article, ArticleDetailsSchema };
