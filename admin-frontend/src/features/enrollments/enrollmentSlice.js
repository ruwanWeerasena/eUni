import {
    createSlice,
    createAsyncThunk,
  } from "@reduxjs/toolkit";

  import EnrollmentService from "./service";
  
const initialState = {enrollmentList:[], status: "idle", error: null};

export const createEnrollment = createAsyncThunk(
  "enrollment/create",
  async (enrollment) => {
    
    const res = await EnrollmentService.create(enrollment);
    return res.data;
  }
);

export const retrieveEnrollments = createAsyncThunk(
  "enrollment/retrieve",
  async () => {
    const res = await EnrollmentService.getAll();
    return res.data;
  }
);


  
const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  extraReducers: {
    [createEnrollment.fulfilled]: (state, action) => {
      state.enrollmentList.push(action.payload);
    },
    [retrieveEnrollments.pending]: (state, action) => {
      return {...state, status:'loading'}
    },
    [retrieveEnrollments.fulfilled]: (state, action) => {
      return {enrollmentList:[...action.payload], status:'succeeded'}
    },
    [retrieveEnrollments.rejected]: (state, action) => {
      return {...state,status:'failed', error:action.payload}
    },

  },
});

const { reducer } = enrollmentSlice;
export default reducer;
