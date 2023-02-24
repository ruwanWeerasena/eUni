import {
    createSlice,
    createAsyncThunk,
  } from "@reduxjs/toolkit";

  import StaffService from "./service";
  
const initialState = {staffList:[], status: "idle", error: null};

export const createStaff = createAsyncThunk(
  "staffs/create",
  async (staff) => {
    
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
    return  id ;
  }
);
  
const staffSlice = createSlice({
  name: "staffs",
  initialState,
  extraReducers: {
    
    [createStaff.fulfilled]: (state, action) => {
      state.staffList.push(action.payload);
    },
    [retrieveStaffs.pending]:(state, action)=>{
      return{...state,status:'loading'}
    },
    [retrieveStaffs.fulfilled]: (state, action) => {
      return {staffList:[...action.payload], status:'succeeded'}
    },
    [updateStaff.fulfilled]: (state, action) => {
      const index = state.staffList.findIndex(
        (staff) => staff.staffId === action.payload.staffId
      );
      state.staffList[index] = {
        ...state.staffList[index],
        ...action.payload
      };
    },
    [deleteStaff.fulfilled]: (state, action) => {
      let index = state.staffList.findIndex(({ id }) => id === action.payload);
      state.staffList.splice(index, 1);
    },
  },
});

const { reducer } = staffSlice;
export default reducer;
