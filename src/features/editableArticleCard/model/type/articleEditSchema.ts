import { ArticleEdit } from "@/entities/Article";
import { ValidateArticleEditErrors } from "../consts/consts";

export interface ArticleEditSchema {
  readonly?: boolean;
  isLoading: boolean;
  error?: string;
  formdata?: ArticleEdit;
  validateErrors?: ValidateArticleEditErrors[];
  data?: ArticleEdit;
}
