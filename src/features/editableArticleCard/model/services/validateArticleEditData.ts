import { ArticleEdit } from "@/entities/Article";
import {
  REG_EXP_IMAGE_URL,
  ValidateArticleEditError,
  ValidateArticleEditErrorType,
  ValidateArticleEditErrors,
} from "../consts/consts";

export const validateArticleEditData = (articleEdit?: ArticleEdit) => {
  const errors: ValidateArticleEditErrors[] = [];

  if (!articleEdit) {
    errors.push({
      type: ValidateArticleEditErrorType.DATA,
      error: ValidateArticleEditError.NO_DATA,
    });
  }

  if (articleEdit) {
    const { title = "", subtitle = "", img = "", blocks = [] } = articleEdit;

    if (title?.length < 2) {
      errors.push({
        type: ValidateArticleEditErrorType.TITLE,
        error: ValidateArticleEditError.INCORRECT_TITLE,
      });
    }

    if (subtitle?.length < 2) {
      errors.push({
        type: ValidateArticleEditErrorType.SUBTITLE,
        error: ValidateArticleEditError.INCORRECT_SUBTITLE,
      });
    }

    if (!REG_EXP_IMAGE_URL.test(img)) {
      errors.push({
        type: ValidateArticleEditErrorType.IMAGE_URL,
        error: ValidateArticleEditError.INCORRECT_IMAGE_URL,
      });
    }

    if (blocks.length === 0) {
      errors.push({
        type: ValidateArticleEditErrorType.BLOCKS,
        error: ValidateArticleEditError.INCORRECT_BLOCKS_DATA,
      });
    }
  }

  return errors;
};
