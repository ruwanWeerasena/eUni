import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  type: 'info',
  open: false,
  remainingTime: 0,
  autoClose: false,
};

const notificationSlice = createSlice({
  name: "staffs",
  initialState,
  reducers: {
    showMessage: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.autoClose = action.payload.autoClose;
      state.open = action.payload.open;

      if (action.payload.autoClose) {
        state.remainingTime = action.payload.remainingTime;
      }
    },
    closeNotification: (state) => {
      state.message = null;
      state.open = false;
    },
  },
});

const { reducer } = notificationSlice;
export default reducer;

export const { showMessage, closeNotification} = notificationSlice.actions;
