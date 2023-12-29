import {
  ArticleBlock,
  ArticleBlockType,
  ArticleEdit,
  ArticleEditSchema,
  ArticleTextBlock,
} from "@/entities/Article";
import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchArticleEditData } from "../services/fetchArticleEditData";
import { updateArticleEditData } from "../services/updateArticleEditData";

const initialState: ArticleEditSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const articleEditSlice = createSlice({
  name: "articleEdit",
  initialState,
  reducers: {
    setReadonly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload;
    },

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

    // Reducer to add a new block
    addBlock: (state, action: PayloadAction<ArticleBlock>) => {
      if (state.formdata)
        state.formdata.blocks = [
          ...(state.formdata.blocks || []),
          action.payload,
        ];
    },

    // Reducer to remove a block
    removeBlock: (state, action: PayloadAction<string>) => {
      const blockIdToRemove = action.payload;
      if (state.formdata)
        state.formdata.blocks = (state.formdata.blocks || []).filter(
          (block) => block.id !== blockIdToRemove
        );
    },

    addParagraph: (
      state,
      action: PayloadAction<{ id: string; paragraph: string }>
    ) => {
      const { id, paragraph } = action.payload;

      if (state.formdata?.blocks) {
        const blockIndex = state.formdata?.blocks.findIndex(
          (block) => block.id === id
        );

        if (blockIndex !== undefined && blockIndex !== -1) {
          const existingBlock = state.formdata?.blocks[blockIndex];

          if (existingBlock?.type === ArticleBlockType.TEXT) {
            const updatedParagraphs = [
              ...(existingBlock.paragraphs || []),
              paragraph,
            ];

            state.formdata.blocks[blockIndex] = {
              ...(existingBlock as Draft<ArticleTextBlock>),
              paragraphs: updatedParagraphs,
            } as Draft<ArticleTextBlock>;
          }
        }
      }
    },

    removeParagraph: (
      state,
      action: PayloadAction<{ id: string; paragraphIndex: number }>
    ) => {
      const { id, paragraphIndex } = action.payload;

      if (state.formdata?.blocks) {
        const blockIndex = state.formdata?.blocks.findIndex(
          (block) => block.id === id
        );

        if (blockIndex !== undefined && blockIndex !== -1) {
          const existingBlock = state.formdata?.blocks[blockIndex];

          if (existingBlock?.type === ArticleBlockType.TEXT) {
            const updatedParagraphs = [...(existingBlock.paragraphs || [])];
            updatedParagraphs.splice(paragraphIndex, 1);

            state.formdata.blocks[blockIndex] = {
              ...(existingBlock as Draft<ArticleTextBlock>),
              paragraphs: updatedParagraphs,
            } as Draft<ArticleTextBlock>;
          }
        }
      }
    },

    updateArticleEditBlock: (
      state,
      action: PayloadAction<{
        id: string;
        updatedBlock: Partial<ArticleBlock>;
        paragraphIndex?: number;
      }>
    ) => {
      const { id, updatedBlock } = action.payload;

      if (state.formdata?.blocks) {
        const blockIndex = state.formdata.blocks.findIndex(
          (block) => block.id === id
        );

        if (blockIndex !== undefined && blockIndex !== -1) {
          const existingBlock = state.formdata.blocks[blockIndex];

          state.formdata.blocks[blockIndex] = {
            ...(existingBlock as Draft<ArticleBlock>),
            ...updatedBlock,
          } as Draft<ArticleBlock>;
        }
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
      });
  },
});

export const { actions: articleEditActions } = articleEditSlice;
export const { reducer: articleEditReducer } = articleEditSlice;
