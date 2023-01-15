import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosRequestHeaders } from "axios";
import { RootState } from "../store";

export interface GqlBody {
  query: string;
  variables: string;
}
export interface FormBody {
  value?: { field: string; value?: string; file?: File };
  checkedValue?: boolean;
}
export interface RequestDataType {
  headersList: { [key: string]: string };
  bodyContent?: string | FormBody[] | GqlBody;
  auth?: string | null;
}

let defaultsHeaders = {
  Accept: "*/*",
  "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  "Access-Control-Allow-Origin": "*",
  origin: "*"
};

export const requestDataSlice = createSlice({
  name: "requestData",
  initialState: {
    headersList: {
      ...defaultsHeaders,
    },
  } as RequestDataType,
  reducers: {
    addBody: (
      state: RequestDataType,
      action: PayloadAction<{ body: string | FormBody[] | GqlBody }>
    ) => {
      state.bodyContent = action.payload.body;
    },
    addHeader: (
      state: RequestDataType,
      action: PayloadAction<{ header: { [key: string]: string } }>
    ) => {
      state.headersList = action.payload.header;
    },
    addAuth: (
      state: RequestDataType,
      action: PayloadAction<{ auth: string }>
    ) => {
      state.auth = action.payload.auth;
    },
  },
});

export const { addBody, addHeader,addAuth } = requestDataSlice.actions;

export const selectRequestData = (state: RootState) => state.requestData;
export default requestDataSlice.reducer;
