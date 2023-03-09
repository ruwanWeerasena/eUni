import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BatchDiscountService from "./service";


const initialState = {
  batchDiscountList: [],
  status: "idle",
  operation: "",
  error: null,
};

export const createBatchDiscount = createAsyncThunk(
  "batchdiscount/create",
  async (batchdiscount) => {
    const res = await BatchDiscountService.create(batchdiscount);
    return res.data;
  }
);

export const retrieveBatchDiscounts = createAsyncThunk(
  "batchdiscount/retrieve",
  async () => {
    const res = await BatchDiscountService.getAll();
    return res.data;
  }
);

export const updateBatchDiscount = createAsyncThunk(
  "batchdiscount/update",
  async ({ id, data }) => {
    console.log("updattttt");
    const res = await BatchDiscountService.update(id, data);
    return res.data;
  }
);

export const deleteBatchDiscount = createAsyncThunk(
  "batchdiscount/delete",
  async ({ id }) => {
    await BatchDiscountService.remove(id);
    return { id };
  }
);

const BatchDiscountSlice = createSlice({
  name: "batchdiscount",
  initialState,
  extraReducers: {
    [createBatchDiscount.pending]: (state, action) => {
      state.status = "pending";
      state.operation = "inserting";
    },
    [createBatchDiscount.fulfilled]: (state, action) => {
      state.batchDiscountList.push(action.payload);
      state.operation = "inserting";
      state.status = "succeeded";
    },
    [createBatchDiscount.rejected]: (state, action) => {
      state.operation = "inserting";
      state.status = "failed";
      state.error = action.error;
    },
    [retrieveBatchDiscounts.pending]: (state, action) => {
      state.operation = "loading";
      state.status = "loading";
    },
    [retrieveBatchDiscounts.fulfilled]: (state, action) => {
      state.batchDiscountList = action.payload
      state.operation = "loading";
      state.status = "succeeded";
    },
    [retrieveBatchDiscounts.rejected]: (state, action) => {
      state.operation = "loading";
      state.status = "failed";
      state.error = action.error;
    },
    [updateBatchDiscount.pending]: (state, action) => {
      state.operation = "updating";
      state.status = "pending";
    },
    [updateBatchDiscount.fulfilled]: (state, action) => {

      const index = state.batchDiscountList.findIndex(
        (discount) => discount.batchDiscountId === action.payload.batchDiscountId
      );

      state.batchDiscountList[index] = {
        ...state[index],
        ...action.payload,
      };
      state.operation = "updating";
      state.status = "succeeded";
    },
    [updateBatchDiscount.rejected]: (state, action) => {
      state.operation = "updating";
      state.status = "failed";
      state.error = action.error;
    },
    [deleteBatchDiscount.pending]: (state, action) => {
      state.operation = "deleting";
      state.status = "pending";
    },
    [deleteBatchDiscount.fulfilled]: (state, action) => {
      let index = state.batchDiscountList.findIndex(({ batchDiscountId }) => batchDiscountId === action.payload.id);
      state.batchDiscountList.splice(index, 1);
      state.operation = "deleting";
      state.status = "succeeded";
    },
    [deleteBatchDiscount.rejected]: (state, action) => {
      state.operation = "deleting";
      state.status = "failed";
      state.error = action.error;
    },
  },
});

const { reducer } = BatchDiscountSlice;
export default reducer;
