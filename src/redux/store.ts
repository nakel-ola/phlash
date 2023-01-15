import requestDataReducer, { RequestDataType } from './features/requestDataSlice';
import dialogReducer, { DialogState } from './features/dialogSlice';
import { configureStore } from "@reduxjs/toolkit";
import requestsReducer, { RequestsState } from "./features/requestsSlice";
import responseReducer, { ResponseType } from './features/responseSlices';

export interface RootState {
  requests: RequestsState;
  dialog: DialogState
  requestData: RequestDataType;
  response: ResponseType;
}

const store = configureStore({
  reducer: {
    requests: requestsReducer,
    dialog: dialogReducer,
    requestData: requestDataReducer,
    response: responseReducer
  },
});

export default store;
