import {
    createSlice,
    createAsyncThunk,
  } from "@reduxjs/toolkit";

  import EnrollmentService from "./service";
  
const initialState = {
  enrollmentList:[], 
  status:{
    modifyingStatus:"idle",
    retrievingStatus:"idle",
  }, 
  operation: "",
  error: null
};

export const createEnrollment = createAsyncThunk(
  "enrollment/create",
  async (enrollment) => {
    
    const res = await EnrollmentService.create(enrollment);
    return res.data;
  }
);
export const createEnrollmentBulk = createAsyncThunk(
  "enrollment/createBulk",
  async (enrollmentlist) => {
    
    const res = await EnrollmentService.createBulk(enrollmentlist);
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
  reducers: {
    resetModifying: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: {
    [createEnrollment.pending]: (state, action) => {
      state.status.modifyingStatus = "pending";
      state.operation = "inserting";
    },
    [createEnrollment.fulfilled]: (state, action) => {
      // state.enrollmentList.push(action.payload);
      state.operation = "inserting";
      state.status.modifyingStatus = "succeeded";
    },
    [createEnrollment.rejected]: (state, action) => {
      state.operation = "inserting";
      state.status.modifyingStatus = "failed";
      state.error = action.error;
    },

    [createEnrollmentBulk.pending]: (state, action) => {
      state.status.modifyingStatus = "pending";
      state.operation = "inserting";
    },
    [createEnrollmentBulk.fulfilled]: (state, action) => {
      // state.enrollmentList.push(action.payload);
      state.operation = "inserting";
      state.status.modifyingStatus = "succeeded";
    },
    [createEnrollmentBulk.rejected]: (state, action) => {
      state.operation = "inserting";
      state.status.modifyingStatus = "failed";
      state.error = action.error;
    },
    [retrieveEnrollments.pending]: (state, action) => {
      return {...state, status:{retrievingStatus:'loading'},operation:"loading"}
    },
    [retrieveEnrollments.fulfilled]: (state, action) => {
      return {...state,enrollmentList:action.payload,operation:"loading",status:{retrievingStatus:"succeeded"}}
    },
    [retrieveEnrollments.rejected]: (state, action) => {
      return {...state,status:{retrievingStatus:"failed"},operation:"loading",error:action.payload}
    },

  },
});

const { reducer } = enrollmentSlice;
export default reducer;
