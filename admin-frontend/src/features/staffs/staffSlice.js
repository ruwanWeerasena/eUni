import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import StaffService from "./service";

const initialState = {
  staffList: [],
  modifyingStatus: "idle",
  loadingStatus: "idle",
  error: null,
};

export const createStaff = createAsyncThunk("staffs/create", async (staff) => {
  const res = await StaffService.create({ ...staff, studentPayments: null });
  return res.data;
});

export const retrieveStaffs = createAsyncThunk(
  "staffs/retrieve",
  async (_, { rejectWithValue }) => {
    try {
      const res = await StaffService.getAll();
      return res.data;
    } catch (error) {
      //console.log("loading eror", error.response.data);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateStaff = createAsyncThunk(
  "staffs/update",
  async ({ id, data }) => {
    const res = await StaffService.update(id, data);
    return res.data;
  }
);

export const deleteStaff = createAsyncThunk("staffs/delete", async ({ id }) => {
  await StaffService.remove(id);
  return id;
});

const staffSlice = createSlice({
  name: "staffs",
  initialState,
  reducers: {
    resetModifying: (state) => {
      state.modifyingStatus = "idle";
    },
  },
  extraReducers: {
    [createStaff.pending]: (state, action) => {
      state.modifyingStatus = "pending";
    },
    [createStaff.fulfilled]: (state, action) => {
      state.staffList.push(action.payload);
      state.modifyingStatus = "succeeded";
    },
    [createStaff.rejected]: (state, action) => {
      state.modifyingStatus = "failed";
      state.error = action;
    },
    [retrieveStaffs.pending]: (state, action) => {
      return { ...state, loadingStatus: "loading" };
    },
    [retrieveStaffs.fulfilled]: (state, action) => {
      return { staffList: [...action.payload], loadingStatus: "succeeded" };
    },
    [retrieveStaffs.rejected]: (state, action) => {
      state.loadingStatus = "failed";
      console.log("error", action.payload);
      state.error = action.error;
    },
    [updateStaff.pending]: (state, action) => {
      state.modifyingStatus = "pending";
    },
    [updateStaff.fulfilled]: (state, action) => {
      const index = state.staffList.findIndex(
        (staff) => staff.staffId === action.payload.staffId
      );
      state.staffList[index] = {
        ...state.staffList[index],
        ...action.payload,
      };
      state.modifyingStatus = "succeeded";
    },
    [updateStaff.rejected]: (state, action) => {
      state.modifyingStatus = "failed";
      state.error = action.payload;
    },
    [deleteStaff.pending]: (state, action) => {
      state.modifyingStatus = "pending";
    },
    [deleteStaff.fulfilled]: (state, action) => {
      let index = state.staffList.findIndex(({ id }) => id === action.payload);
      state.staffList.splice(index, 1);
      state.modifyingStatus = "succeeded";
    },
    [deleteStaff.rejected]: (state, action) => {
      state.modifyingStatus = "failed";
      state.error = action.payload;
    },
  },
});

const { reducer } = staffSlice;

export const { resetModifying } = staffSlice.actions;

export default reducer;
