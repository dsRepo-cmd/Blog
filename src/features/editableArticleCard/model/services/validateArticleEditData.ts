import { ArticleEdit } from "@/entities/Article";
import { REG_EXP_IMAGE_URL, ValidateArticleEditError } from "../consts/consts";
import { ValidateArticleEditErrors } from "../type/articleEditSchema";

export const validateArticleEditData = (articleEdit?: ArticleEdit) => {
  const errors: ValidateArticleEditErrors = {};

  if (!articleEdit) {
    errors.data = ValidateArticleEditError.NO_DATA;
  }

  if (articleEdit) {
    const { title = "", blocks = [] } = articleEdit;

    if (title?.length < 2) {
      errors.title = ValidateArticleEditError.INCORRECT_TITLE;
    }

    if (blocks.length === 0) {
      errors.blocks = ValidateArticleEditError.INCORRECT_BLOCKS_DATA;
    }
  }

  return errors;
};
