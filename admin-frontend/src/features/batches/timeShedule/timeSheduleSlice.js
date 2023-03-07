import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import TimeSheduleService from "./service";

const initialState = {
  timeSheduleList: [],
  status: "idle",
  operation: "",
  error: null,
};

export const createTimeShedule = createAsyncThunk(
  "batchTimeShedule/create",
  async (timeShedule) => {
    const res = await TimeSheduleService.create({
      ...timeShedule
    });
    return res.data;
  }
);

export const retrieveBatchTimeShedules = createAsyncThunk(
  "batchTimeShedule/retrieve",
  async () => {
    const res = await TimeSheduleService.getAll();
    return res.data;
  }
);

export const updateBatchTimeShedule = createAsyncThunk(
  "batchTimeShedule/update",
  async ({ id, data }) => {
    const res = await TimeSheduleService.update(id, data);
    return res.data;
  }
);

export const deleteBatchTimeShedule = createAsyncThunk(
  "batchTimeShedule/delete",
  async ({ id }) => {
    await TimeSheduleService.remove(id);
    return { id };
  }
);

const branchTimeSheduleSlice = createSlice({
  name: "batchTimeShedule",
  initialState,
  extraReducers: {
    [createTimeShedule.pending]: (state, action) => {
      state.status = "pending";
      state.operation = "inserting";
    },
    [createTimeShedule.fulfilled]: (state, action) => {
      state.timeSheduleList.push(action.payload);
      state.operation = "inserting";
      state.status = "succeeded";
    },
    [createTimeShedule.rejected]: (state, action) => {
      state.operation = "inserting";
      state.status = "failed";
      state.error = action.error;
    },
    [retrieveBatchTimeShedules.pending]: (state, action) => {
      state.operation = "loading";
      state.status = "loading";
    },
    [retrieveBatchTimeShedules.fulfilled]: (state, action) => {
      state.timeSheduleList = action.payload
      state.operation = "loading";
      state.status = "succeeded";
    },
    [retrieveBatchTimeShedules.rejected]: (state, action) => {
      state.operation = "loading";
      state.status = "failed";
      state.error = action.error;
    },
    [updateBatchTimeShedule.pending]: (state, action) => {
      state.operation = "updating";
      state.status = "pending";
    },
    [updateBatchTimeShedule.fulfilled]: (state, action) => {

      const index = state.timeSheduleList.findIndex(
        (timeShedule) => timeShedule.batchTimeSheduleId === action.payload.batchTimeSheduleId
      );

      state.timeSheduleList[index] = {
        ...state[index],
        ...action.payload,
      };
      state.operation = "updating";
      state.status = "succeeded";
    },
    [updateBatchTimeShedule.rejected]: (state, action) => {
      state.operation = "updating";
      state.status = "failed";
      state.error = action.error;
    },
    [deleteBatchTimeShedule.pending]: (state, action) => {
      state.operation = "deleting";
      state.status = "pending";
    },
    [deleteBatchTimeShedule.fulfilled]: (state, action) => {
      let index = state.timeSheduleList.findIndex(({ id }) => id === action.payload.id);
      state.timeSheduleList.splice(index, 1);
      state.operation = "deleting";
      state.status = "succeeded";
    },
    [deleteBatchTimeShedule.rejected]: (state, action) => {
      state.operation = "deleting";
      state.status = "failed";
      state.error = action.error;
    },
  },
});

const { reducer } = branchTimeSheduleSlice;
export default reducer;
