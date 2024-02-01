import {
  ArticleBlock,
  ArticleEdit,
  ArticleEditSchema,
} from "@/entities/Article";
import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchArticleEditData } from "../services/fetchArticleEditData";
import { updateArticleEditData } from "../services/updateArticleEditData";
import { createArticle } from "../services/createArticle";

const initialState: ArticleEditSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
  formdata: undefined,
};

export const articleEditSlice = createSlice({
  name: "articleEdit",
  initialState,
  reducers: {
    cancelEdit: (state) => {
      state.readonly = true;
      state.formdata = state.data;
      state.validateErrors = undefined;
    },

    updateArticleEdit: (state, action: PayloadAction<ArticleEdit>) => {
      state.formdata = {
        ...state.formdata,
        ...action.payload,
      };
    },

    addBlock: (state, action: PayloadAction<ArticleBlock>) => {
      if (state.formdata)
        state.formdata.blocks = [
          ...(state.formdata.blocks || []),
          action.payload,
        ];
    },

    removeBlock: (state, action: PayloadAction<string>) => {
      const blockIdToRemove = action.payload;
      if (state.formdata)
        state.formdata.blocks = (state.formdata.blocks || []).filter(
          (block) => block.id !== blockIdToRemove
        );
    },

    updateArticleEditBlock: (
      state,
      action: PayloadAction<{
        id: string;
        updatedBlock: Partial<ArticleBlock>;
      }>
    ) => {
      const { id, updatedBlock } = action.payload;

      if (state.formdata?.blocks) {
        const updatedBlocks = state.formdata.blocks.map((block) => {
          if (block.id === id) {
            return {
              ...(block as Draft<ArticleBlock>),
              ...updatedBlock,
            } as Draft<ArticleBlock>;
          }
          return block;
        });

        state.formdata.blocks = updatedBlocks;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleEditData.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchArticleEditData.fulfilled,
        (state, action: PayloadAction<ArticleEdit>) => {
          state.isLoading = false;
          state.data = action.payload;
          state.formdata = action.payload;
        }
      )
      .addCase(fetchArticleEditData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateArticleEditData.pending, (state) => {
        state.validateErrors = undefined;
        state.isLoading = true;
      })
      .addCase(
        updateArticleEditData.fulfilled,
        (state, action: PayloadAction<ArticleEdit>) => {
          state.isLoading = false;
          state.data = action.payload;
          state.formdata = action.payload;
          state.validateErrors = undefined;
          state.readonly = true;
        }
      )
      .addCase(updateArticleEditData.rejected, (state, action) => {
        state.isLoading = false;
        state.validateErrors = action.payload;
      })
      .addCase(createArticle.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        createArticle.fulfilled,
        (state, action: PayloadAction<ArticleEdit>) => {
          state.isLoading = false;
          state.data = action.payload;
          state.formdata = action.payload;
        }
      )
      .addCase(createArticle.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { actions: articleEditActions } = articleEditSlice;
export const { reducer: articleEditReducer } = articleEditSlice;
