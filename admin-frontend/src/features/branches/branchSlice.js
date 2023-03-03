import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import BranchService from "./service";

const initialState = {
  branchList: [],
  status: "idle",
  operation: "",
  error: null,
};

export const createBranch = createAsyncThunk(
  "branches/create",
  async (branch) => {
    console.log('thunk');
    const res = await BranchService.create({ ...branch, batches: null });
    return res.data;
  }
);

export const retrieveBranches = createAsyncThunk(
  "branches/retrieve",
  async () => {
    const res = await BranchService.getAll();
    return res.data;
  }
);

export const updateBranch = createAsyncThunk(
  "branches/update",
  async ({ id, data }) => {
    const res = await BranchService.update(id, data);
    return res.data;
  }
);

export const deleteBranch = createAsyncThunk(
  "branches/delete",
  async ({ id }) => {
    await BranchService.remove(id);
    return { id };
  }
);

const branchSlice = createSlice({
  name: "branches",
  initialState,
  reducers: {
    resetModifying: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: {
    [createBranch.pending]: (state, action) => {
      state.status = "pending";
      state.operation = "inserting";
    },
    [createBranch.fulfilled]: (state, action) => {
      state.branchList.push(action.payload);
      state.operation = "inserting";
      state.status = "succeeded";
    },
    [createBranch.rejected]: (state, action) => {
      state.operation = "inserting";
      state.status = "failed";
      state.error = action.error;
    },
    [retrieveBranches.pending]: (state, action) => {
      // state.operation = "loading";
      // state.status = "loading";
      return {...state, status:'loading',operation:"loading"}
    },
    [retrieveBranches.fulfilled]: (state, action) => {
      // state.branchList = action.payload
      // state.operation = "loading";
      // state.status = "succeeded";
      return {...state,branchList:action.payload,operation:"loading",status:"succeeded"}
    },
    [retrieveBranches.rejected]: (state, action) => {
      state.operation = "loading";
      state.status = "failed";
      state.error = action.error;
    },
    [updateBranch.pending]: (state, action) => {
      state.operation = "updating";
      state.status = "pending";
    },
    [updateBranch.fulfilled]: (state, action) => {
      const index = state.branchList.findIndex(
        (branch) => branch.branchId === action.payload.branchId
      );
      state.branchList[index] = {
        ...state.branchList[index],
        ...action.payload,
      };
      state.operation = "updating";
      state.status = "succeeded";
    },
    [updateBranch.rejected]: (state, action) => {
      state.operation = "updating";
      state.status = "failed";
      state.error = action.error;
    },
    [deleteBranch.pending]: (state, action) => {
      state.operation = "deleting";
      state.status = "pending";
    },
    [deleteBranch.fulfilled]: (state, action) => {
      let index = state.branchList.findIndex(
        ({ branchId }) => branchId === action.payload.id
      );
      state.branchList.splice(index, 1);
      state.operation = "deleting";
      state.status = "succeeded";
    },
    [deleteBranch.rejected]: (state, action) => {
      state.operation = "deleting";
      state.status = "failed";
      state.error = action.error;
    },
  },
});

const { reducer } = branchSlice;

export const { resetModifying } = branchSlice.actions;

export default reducer;
