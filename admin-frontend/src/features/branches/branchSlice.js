import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import BranchService from "./service";

const initialState = { branchList: [], status: "idle", error: null };

export const createBranch = createAsyncThunk(
  "branches/create",
  async (branch) => {
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
  extraReducers: {
    [createBranch.fulfilled]: (state, action) => {
      state.branchList.push(action.payload);
    },
    [retrieveBranches.pending]: (state, action) => {
      return { ...state, status: "loading" };
    },
    [retrieveBranches.fulfilled]: (state, action) => {
      return { branchList: [...action.payload], status: "succeeded" };
    },
    [retrieveBranches.rejected]: (state, action) => {
      return { ...state, status: "failed", error: action.payload };
    },
    [updateBranch.fulfilled]: (state, action) => {
      const index = state.branchList.findIndex(
        (branch) => branch.branchId === action.payload.branchId
      );
      state.branchList[index] = {
        ...state.branchList[index],
        ...action.payload,
      };
    },
    [deleteBranch.fulfilled]: (state, action) => {
      let index = state.branchList.findIndex(
        ({ branchId }) => branchId === action.payload.id
      );

      state.branchList.splice(index, 1);
    },
  },
});

const { reducer } = branchSlice;
export default reducer;
