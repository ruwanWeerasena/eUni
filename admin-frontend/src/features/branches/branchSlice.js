import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import BranchService from "./service";

const initialState = { branchList: [], modifyingStatus:'idle', loadingStatus: "idle", error: null };

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
  reducers: {
    resetModifying: (state) => {
      state.modifyingStatus = "idle";
    }
  },
  extraReducers: {
    [createBranch.pending]: (state, action) => {
      return { ...state, modifyingStatus: "pending" };
    },
    [createBranch.fulfilled]: (state, action) => {
      state.branchList.push(action.payload);
      state.modifyingStatus = "succeeded";
    },
    [retrieveBranches.pending]: (state, action) => {
      return { ...state, loadingStatus: "loading" };
    },
    [retrieveBranches.fulfilled]: (state, action) => {
      return { branchList: [...action.payload], loadingStatus: "succeeded" };
    },
    [retrieveBranches.rejected]: (state, action) => {
      return { ...state, status: "failed", error: action.payload };
    },
    [updateBranch.pending]: (state, action) => {
      state.modifyingStatus = "pending";
    },
    [updateBranch.fulfilled]: (state, action) => {
      const index = state.branchList.findIndex(
        (branch) => branch.branchId === action.payload.branchId
      );
      state.branchList[index] = {
        ...state.branchList[index],
        ...action.payload,
      };
      state.modifyingStatus = "succeeded";
    },
    [deleteBranch.pending]: (state, action) => {
      state.modifyingStatus = "pending";
    },
    [deleteBranch.fulfilled]: (state, action) => {
      let index = state.branchList.findIndex(
        ({ branchId }) => branchId === action.payload.id
      );

      console.log(1)
      state.branchList.splice(index, 1);
      state.modifyingStatus = "succeeded";
    },
  },
});

const { reducer } = branchSlice;

export const { resetModifying} = branchSlice.actions;

export default reducer;
