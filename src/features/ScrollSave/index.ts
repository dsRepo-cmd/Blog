import { getSaveScrollByPath } from "./model/selectors/ScrollSave";
import {
  scrollSaveActions,
  scrollSaveReducer,
} from "./model/slices/ScrollSaveSlice";
import { ScrollSaveSchema } from "./model/types/ScrollSaveSchema";

export { getSaveScrollByPath, scrollSaveActions, scrollSaveReducer };
export type { ScrollSaveSchema };
