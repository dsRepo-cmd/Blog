export enum ValidateArticleEditError {
  INCORRECT_TITLE = "INCORRECT_TITLE",
  INCORRECT_SUBTITLE = "INCORRECT_SUBTITLE",
  INCORRECT_IMAGE_URL = "INCORRECT_IMAGE_URL",
  INCORRECT_BLOCKS_DATA = "INCORRECT_BLOCKS_DATA",
  NO_DATA = "NO_DATA",
  SERVER_ERROR = "SERVER_ERROR",
}

export enum ValidateArticleEditErrorType {
  DATA = "data",
  TITLE = "title",
  SUBTITLE = "subtitle",
  IMAGE_URL = "imageUrl",
  SERVER = "server",
  BLOCKS = "blocks",
}

export interface ValidateArticleEditErrors {
  type: ValidateArticleEditErrorType;
  error?: ValidateArticleEditError;
}

export const REG_EXP_IMAGE_URL: RegExp = new RegExp(/^https:\/\//);

export interface FilteredErrors {
  titleError?: string;
  subtitleError?: string;
  imageUrlError?: string;
  blocksError?: string;
}
