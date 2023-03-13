import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  type: 'info',
  open: false,
  remainingTime: 0,
  autoClose: false,
  randomNumber:0
};

const notificationSlice = createSlice({
  name: "staffs",
  initialState,
  reducers: {
    
    showInfo: (state, action) => {
      state.message = action.payload.message;
      state.type = 'info';
      state.autoClose = action.payload.autoClose ?? true;
      state.open = action.payload.open ?? true;
      state.random = action.payload.random ?? Math.random() * 10000;

      if (action.payload.autoClose??true) {
        state.remainingTime = action.payload.remainingTime ?? 3000;
      }
    },
    showError: (state, action) => {
      state.message = action.payload.message;
      state.type =  'error';
      state.autoClose = action.payload.autoClose ?? true;
      state.open = action.payload.open ?? true;
      state.random = action.payload.random ?? Math.random() * 10000;

      if (action.payload.autoClose) {
        state.remainingTime = action.payload.remainingTime ?? 3000;
      }
    },
    showWarning: (state, action) => {
      state.message = action.payload.message;
      state.type =  'warning';
      state.autoClose = action.payload.autoClose ?? true;
      state.open = action.payload.open ?? true;
      state.random = action.payload.random ?? Math.random() * 10000;

      if (action.payload.autoClose) {
        state.remainingTime = action.payload.remainingTime ?? 3000;
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

export const { showInfo,showError, showWarning, closeNotification} = notificationSlice.actions;
