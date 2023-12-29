import { ValidateArticleEditError } from "@/features/editableArticleCard";
import { ArticleEdit } from "../..";

export interface ArticleEditSchema {
  readonly?: boolean;
  isLoading: boolean;
  error?: string;
  formdata?: ArticleEdit;
  validateErrors?: ValidateArticleEditError[];
  data?: ArticleEdit;
}
