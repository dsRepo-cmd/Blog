import ArticleDetails from "./ui/ArticleDetails/ArticleDetails";
import { Article } from "./model/types/article";
import { ArticleDetailsSchema } from "./model/types/articleDetailsSchema";
import { getArticleDetailsData } from "./model/selectors/articleDetails";
import {
  ArticleView,
  ArticleSortField,
  ArticleType,
} from "./model/consts/consts";
import ArticleList from "./ui/ArticleList/ArticleList";

export {
  ArticleSortField,
  ArticleView,
  getArticleDetailsData,
  ArticleType,
  ArticleDetails,
  ArticleList,
};
export type { Article, ArticleDetailsSchema };
