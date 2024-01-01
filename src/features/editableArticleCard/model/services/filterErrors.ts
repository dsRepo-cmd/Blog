import {
  FilteredErrors,
  ValidateArticleEditErrorType,
  ValidateArticleEditErrors,
} from "../consts/consts";

export function filterErrors(
  errors: ValidateArticleEditErrors[]
): FilteredErrors {
  const filteredErrors: FilteredErrors = {};

  errors.forEach((error) => {
    switch (error.type) {
      case ValidateArticleEditErrorType.TITLE:
        filteredErrors.titleError = error.error;
        break;
      case ValidateArticleEditErrorType.SUBTITLE:
        filteredErrors.subtitleError = error.error;
        break;
      case ValidateArticleEditErrorType.IMAGE_URL:
        filteredErrors.imageUrlError = error.error;
        break;
      case ValidateArticleEditErrorType.BLOCKS:
        filteredErrors.blocksError = error.error;
        break;
      default:
        break;
    }
  });

  return filteredErrors;
}
