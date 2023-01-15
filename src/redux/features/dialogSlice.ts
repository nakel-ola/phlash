import { RootState } from './../store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Option = {
  open: boolean;
  data: any | null;
};

export interface DialogState {
  create: Option;
  rename: Option;
  delete: Option;
}


type Type = "create" | "rename" | "delete";

type PayloadProps = {
  type: Type;
  data?: any | null;
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState: {
    create: {
      open: false,
      data: null,
    },
    rename: {
      open: false,
      data: null,
    },
    delete: {
      open: false,
      data: null,
    },
  } as DialogState,
  reducers: {
    add: (state: DialogState, action: PayloadAction<PayloadProps>) => {
      state[action.payload.type] = {
        open: true,
        data: action.payload.data || null,
      };
    },
    remove: (state: DialogState, action: PayloadAction<{ type: Type }>) => {
      state[action.payload.type] = { open: false, data: null };
    },
  },
});

export const { add, remove } = dialogSlice.actions;

export const selectDialog = (state: RootState) => state.dialog;

export default dialogSlice.reducer;