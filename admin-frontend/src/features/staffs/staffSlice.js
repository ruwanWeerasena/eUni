import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import StaffService from "./service";

const initialState = {
  staffList: [],
  status: "idle",
  operation: "",
  error: null,
};

export const createStaff = createAsyncThunk("staffs/create", async (staff) => {
  const res = await StaffService.create({ ...staff, studentPayments: null });
  return res.data;
});

export const retrieveStaffs = createAsyncThunk("staffs/retrieve", async () => {
  try {
    const res = await StaffService.getAll();
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
});

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
      state.status = "idle";
    },
  },
  extraReducers: {
    [createStaff.pending]: (state, action) => {
      state.status = "pending";
      state.operation = "inserting";
    },
    [createStaff.fulfilled]: (state, action) => {
      state.staffList.push(action.payload);
      state.operation = "inserting";
      state.status = "succeeded";
    },
    [createStaff.rejected]: (state, action) => {
      state.operation = "inserting";
      state.status = "failed";
      state.error = action.error;
    },
    [retrieveStaffs.pending]: (state, action) => {
      return { ...state, status: "loading", operation: "loading" };
    },
    [retrieveStaffs.fulfilled]: (state, action) => {
      return {
        staffList: [...action.payload],
        status: "succeeded",
        operation: "loading",
      };
    },
    [retrieveStaffs.rejected]: (state, action) => {
      state.operation = "loading";
      state.status = "failed";
      state.error = action.error;
    },
    [updateStaff.pending]: (state, action) => {
      state.operation = "updating";
      state.status = "pending";
    },
    [updateStaff.fulfilled]: (state, action) => {
      const index = state.staffList.findIndex(
        (staff) => staff.staffId === action.payload.staffId
      );
      state.staffList[index] = {
        ...state.staffList[index],
        ...action.payload,
      };
      state.operation = "updating";
      state.status = "succeeded";
    },
    [updateStaff.rejected]: (state, action) => {
      state.operation = "updating";
      state.status = "failed";
      state.error = action.error;
    },
    [deleteStaff.pending]: (state, action) => {
      state.operation = "deleting";
      state.status = "pending";
    },
    [deleteStaff.fulfilled]: (state, action) => {
      console.log("deleted succedded");
      let index = state.staffList.findIndex(({ id }) => id === action.payload);
      state.staffList.splice(index, 1);
      state.operation = "deleting";
      state.status = "succeeded";
    },
    [deleteStaff.rejected]: (state, action) => {
      state.operation = "deleting";
      state.status = "failed";
      state.error = action.error;
    },
  },
});

const { reducer } = staffSlice;

export const { resetModifying } = staffSlice.actions;

export default reducer;
