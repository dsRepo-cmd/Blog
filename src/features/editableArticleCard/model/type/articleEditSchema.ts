import { ArticleEdit } from "@/entities/Article";
import { ValidateArticleEditError } from "../consts/consts";

export interface ArticleEditSchema {
  readonly?: boolean;
  isLoading: boolean;
  error?: string;
  formdata?: ArticleEdit;
  validateErrors?: ValidateArticleEditErrors;
  data?: ArticleEdit;
}

export interface ValidateArticleEditErrors {
  title?: ValidateArticleEditError;
  subtitle?: ValidateArticleEditError;
  imageUrl?: ValidateArticleEditError;
  data?: ValidateArticleEditError;
  blocks?: ValidateArticleEditError;
}

export interface FilteredErrors {
  titleError?: string;
  subtitleError?: string;
  imageUrlError?: string;
  blocksError?: string;
}
