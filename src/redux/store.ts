import { configureStore } from "@reduxjs/toolkit";
import dialogReducer, { DialogState } from "./features/dialogSlice";
import requestDataReducer, {
  RequestDataType,
} from "./features/requestDataSlice";
import requestsReducer, { RequestsState } from "./features/requestsSlice";
import responseReducer, { ResponseType } from "./features/responseSlices";
import userReducer, { UserState } from "./features/userSlice";

export interface RootState {
  requests: RequestsState;
  dialog: DialogState;
  requestData: RequestDataType;
  response: ResponseType;
  user: UserState;
}

const store = configureStore({
  reducer: {
    requests: requestsReducer,
    dialog: dialogReducer,
    requestData: requestDataReducer,
    response: responseReducer,
    user: userReducer,
  },
});

export default store;
