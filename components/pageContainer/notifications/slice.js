import { createSlice } from "@reduxjs/toolkit";
import { remove } from "lodash";

const initialState = {
  queuedNotifications: [],
  closedNotifications: {},
};

const slice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    queueNotification(state, action) {
      state.queuedNotifications.push(action.payload);
    },
    closeNotification(state, action) {
      const id = action.payload.id;
      state.closedNotifications[id] = id;
      remove(state.queuedNotifications, ["id", id]);
    },
  },
});

export const { name, actions, reducer } = slice;
