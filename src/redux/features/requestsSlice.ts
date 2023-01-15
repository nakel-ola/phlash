import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import merge from "../../utils/merge";
import { RootState } from "../store";
import { GroupRequest, Request } from "./../../../typings.d";

export interface SelectedType extends Request {
  groupId: string | number;
}

export type RequestsState = {
  groupRequests: GroupRequest[];
  selected: SelectedType | null;
};

// creating a request slice
export const requestsSlice = createSlice({
  name: "requests",
  initialState: {
    groupRequests: [],
    selected: null,
  } as RequestsState,
  reducers: {
    //  create new Group request
    createGroup: (
      state: RequestsState,
      action: PayloadAction<GroupRequest>
    ) => {
      // merging the new group request with the existing one's
      state.groupRequests = merge(state.groupRequests, [action.payload], "id");
    },

    //  create Groups request
    createGroups: (
      state: RequestsState,
      action: PayloadAction<GroupRequest[]>
    ) => {
      // merging the new group request with the existing one's
      state.groupRequests = merge(state.groupRequests, action.payload, "id");
    },

    //  create new request to specific group
    createRequest: (
      state: RequestsState,
      action: PayloadAction<{ id: string | number; request: Request }>
    ) => {
      // create a new array of groups with the existing group
      let newGroupRequest = [...state.groupRequests];

      // finding index of the group which the new request belongs to
      let index = newGroupRequest.findIndex((d) => d.id === action.payload.id);

      //  checking if the the group exists
      if (index !== -1) {
        // pushing the new request into is group
        newGroupRequest[index].requests.push(action.payload.request);

        // updating the real groups state with the new group
        state.groupRequests = newGroupRequest;
      }
    },
    // delete group requests
    deleteGroup: (
      state: RequestsState,
      action: PayloadAction<{ groupId: string | number }>
    ) => {
      // create a new array of groups with the existing group
      let newGroup = [...state.groupRequests];

      // a new variable for the selected request
      let selected = state.selected;

      // finding index of the group to delete
      let index = newGroup.findIndex((r) => r.id === action.payload.groupId);

      //  checking if group to delete exists
      if (index !== -1) {
        // removing group to delete from the new array of groups
        newGroup.splice(index, 1);

        // checking if the request is already selected
        if (selected?.groupId === action.payload.groupId) {
          state.selected = null;
        }

        // updating the real groups state with the new group
        state.groupRequests = newGroup;
      }
    },

    // delete new request of a specific group
    deleteRequest: (
      state: RequestsState,
      action: PayloadAction<{ groupId: number | string; id: number | string }>
    ) => {
      // create a new array of groups with the existing group
      let newGroup = [...state.groupRequests];

      // a new variable for the selected request
      let selected = state.selected;

      // finding index of the group of the request to delete
      let index = newGroup.findIndex((d) => d.id === action.payload.groupId);

      //  checking if the group exists
      if (index !== -1) {
        // find the request to delete in the selected group
        let requestId = newGroup[index].requests.findIndex(
          (r) => r.id === action.payload.id
        );

        // removing the request from its group
        newGroup[index].requests.splice(requestId, 1);

        // checking if the request is already selected
        if (selected?.id === action.payload.id) {
          state.selected = null;
        }

        // updating the real groups state with the new group
        state.groupRequests = newGroup;
      }
    },

    // update a specific group name
    updateGroup: (
      state: RequestsState,
      action: PayloadAction<{ groupId: string | number; name: string }>
    ) => {
      // create a new array of groups with the existing group
      let newGroup = [...state.groupRequests];

      // finding the index of the group to rename
      let index = newGroup.findIndex((d) => d.id === action.payload.groupId);

      // checking if the group exists
      if (index !== -1) {
        // change the group name to the new name
        newGroup[index].name = action.payload.name;

        // updating the real groups state with the new group
        state.groupRequests = newGroup;
      }
    },

    // update a specific request in a group
    updateRequest: (
      state: RequestsState,
      action: PayloadAction<{ groupId: string | number; request: Request }>
    ) => {
      // create a new array of groups with the existing group
      let newGroup = [...state.groupRequests];

      // a new variable for the selected request
      let selected = state.selected;

      // finding the index of the group the request to be updated belongs to
      let index = newGroup.findIndex((d) => d.id === action.payload.groupId);

      // checking if the group exists
      if (index !== -1) {
        // finding the index of the request to be updated in the group;
        let requestIndex = newGroup[index].requests.findIndex(
          (r) => r.id === action.payload.request.id
        );

        // checking if the request exists in the group
        if (requestIndex !== -1) {
          // update the requestwith the new request
          newGroup[index].requests[requestIndex] = action.payload.request;

          // checking if the request is already selected
          if (selected?.id === action.payload.request.id) {
            // updating the real selected state with the new request
            state.selected = {
              groupId: action.payload.groupId,
              ...action.payload.request,
            };
          }

          // updating the real groups state with the new group
          state.groupRequests = newGroup;
        }
      }
    },

    // add clicked request to selected
    addSelected: (
      state: RequestsState,
      action: PayloadAction<{ groupId: string | number; request: Request }>
    ) => {
      // changing the selected state with the clicked request
      state.selected = {
        groupId: action.payload.groupId,
        ...action.payload.request,
      };
    },

    // delete all group in state
    deleteAllGroup: (state: RequestsState) => {
      state.groupRequests = [];
      state.selected = null;
    },
  },
});

// exporting all request in the reducer
export const {
  addSelected,
  createGroup,
  createGroups,
  createRequest,
  deleteGroup,
  deleteRequest,
  updateGroup,
  updateRequest,
  deleteAllGroup,
} = requestsSlice.actions;

export const selectSelected = (state: RootState) => state.requests.selected;
export const selectGroupRequests = (state: RootState) =>
  state.requests.groupRequests;

export default requestsSlice.reducer;
