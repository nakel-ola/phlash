import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse,AxiosError } from "axios";
import { RootState } from "../store";

export interface ResponseData {
  data: AxiosResponse["data"];
  status: AxiosResponse["status"];
  statusText: AxiosResponse["statusText"];
  headers: AxiosResponse["headers"];
  progress: number;
  type: "success" | "error"

}
export interface ResponseType {
  response: ResponseData | null;
  loading: boolean;
}

export const requestDataSlice = createSlice({
  name: "response",
  initialState: {
    response: null,
    loading: false,
  } as ResponseType,
  reducers: {
    add: (state: ResponseType, action: PayloadAction<ResponseData>) => {
      state.response = { ...action.payload };
    },
    toggleLoading: (state: ResponseType, action: PayloadAction<{ loading: boolean }>) => {
      state.loading = action.payload.loading;
    }
  },
});

export const { add,toggleLoading } = requestDataSlice.actions;

export const selectResponse = (state: RootState) => state.response.response;
export const selectLoading = (state: RootState) => state.response.loading;
export default requestDataSlice.reducer;
