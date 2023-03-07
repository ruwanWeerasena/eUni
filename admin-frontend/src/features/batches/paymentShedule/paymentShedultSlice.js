import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import PaymentSheduleService from "./service";

const initialState = {
  paymentSheduleList: [],
  status: "idle",
  operation: "",
  error: null,
};

export const createPaymentShedule = createAsyncThunk(
  "batchPaymentShedule/create",
  async (paymentShedule) => {
    const res = await PaymentSheduleService.create({
      ...paymentShedule
    });
    return res.data;
  }
);

export const retrieveBatchPaymentShedules = createAsyncThunk(
  "batchPaymentShedule/retrieve",
  async () => {
    const res = await PaymentSheduleService.getAll();
    return res.data;
  }
);

export const updateBatchPaymentShedule = createAsyncThunk(
  "batchPaymentShedule/update",
  async ({ id, data }) => {
    const res = await PaymentSheduleService.update(id, data);
    return res.data;
  }
);

export const deleteBatchPaymentShedule = createAsyncThunk(
  "batchPaymentShedule/delete",
  async ({ id }) => {
    await PaymentSheduleService.remove(id);
    return { id };
  }
);

const branchPaymentSheduleSlice = createSlice({
  name: "batchPaymentShedule",
  initialState,
  extraReducers: {
    [createPaymentShedule.pending]: (state, action) => {
      state.status = "pending";
      state.operation = "inserting";
    },
    [createPaymentShedule.fulfilled]: (state, action) => {
      state.paymentSheduleList.push(action.payload);
      state.operation = "inserting";
      state.status = "succeeded";
    },
    [createPaymentShedule.rejected]: (state, action) => {
      state.operation = "inserting";
      state.status = "failed";
      state.error = action.error;
    },
    [retrieveBatchPaymentShedules.pending]: (state, action) => {
      state.operation = "loading";
      state.status = "loading";
    },
    [retrieveBatchPaymentShedules.fulfilled]: (state, action) => {
      state.paymentSheduleList = action.payload
      state.operation = "loading";
      state.status = "succeeded";
    },
    [retrieveBatchPaymentShedules.rejected]: (state, action) => {
      state.operation = "loading";
      state.status = "failed";
      state.error = action.error;
    },
    [updateBatchPaymentShedule.pending]: (state, action) => {
      state.operation = "updating";
      state.status = "pending";
    },
    [updateBatchPaymentShedule.fulfilled]: (state, action) => {

      const index = state.paymentSheduleList.findIndex(
        (paymentShedule) => paymentShedule.batchPaymentSheduleId === action.payload.batchPaymentSheduleId
      );

      state.paymentSheduleList[index] = {
        ...state[index],
        ...action.payload,
      };
      state.operation = "updating";
      state.status = "succeeded";
    },
    [updateBatchPaymentShedule.rejected]: (state, action) => {
      state.operation = "updating";
      state.status = "failed";
      state.error = action.error;
    },
    [deleteBatchPaymentShedule.pending]: (state, action) => {
      state.operation = "deleting";
      state.status = "pending";
    },
    [deleteBatchPaymentShedule.fulfilled]: (state, action) => {
      let index = state.paymentSheduleList.findIndex(({ id }) => id === action.payload.id);
      state.paymentSheduleList.splice(index, 1);
      state.operation = "deleting";
      state.status = "succeeded";
    },
    [deleteBatchPaymentShedule.rejected]: (state, action) => {
      state.operation = "deleting";
      state.status = "failed";
      state.error = action.error;
    },
  },
});

const { reducer } = branchPaymentSheduleSlice;
export default reducer;
