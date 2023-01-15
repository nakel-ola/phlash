import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { clearStorage, getStorage, setStorage } from "../../utils/localStorage";
import { RootState } from "../store";

export interface UserState {
  userId: string | null;
}
export let key = "userId";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: getStorage<UserState["userId"]>(key, null),
  } as UserState,
  reducers: {
    addUserId: (state: UserState, action: PayloadAction<string>) => {
      state.userId = action.payload;
      setStorage(key, action.payload);
    },
    removeUserId: (state: UserState) => {
      state.userId = null;
      clearStorage(key);
    },
  },
});

export const { addUserId, removeUserId } = userSlice.actions;

export const selectUserId = (state: RootState) => state.user.userId;

export default userSlice.reducer;