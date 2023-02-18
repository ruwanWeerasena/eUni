import {
    createSlice,
    createAsyncThunk,
  } from "@reduxjs/toolkit";

  import StaffService from "./service";
  
const initialState = [];

export const createStaff = createAsyncThunk(
  "staffs/create",
  async (staff) => {
    console.log('staff create', staff)
    const res = await StaffService.create({...staff, studentPayments:null});
    return res.data;
  }
);

export const retrieveStaffs = createAsyncThunk(
  "staffs/retrieve",
  async () => {
    const res = await StaffService.getAll();
    return res.data;
  }
);

export const updateStaff = createAsyncThunk(
  "staffs/update",
  async ({ id, data }) => {
    const res = await StaffService.update(id, data);
    return res.data;
  }
);

export const deleteStaff = createAsyncThunk(
  "staffs/delete",
  async ({ id }) => {
    await StaffService.remove(id);
    return { id };
  }
);
  
const staffSlice = createSlice({
  name: "staffs",
  initialState,
  extraReducers: {
    [createStaff.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveStaffs.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateStaff.fulfilled]: (state, action) => {
      const index = state.findIndex(
        (tutorial) => tutorial.id === action.payload.id
      );
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteStaff.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

const { reducer } = staffSlice;
export default reducer;
