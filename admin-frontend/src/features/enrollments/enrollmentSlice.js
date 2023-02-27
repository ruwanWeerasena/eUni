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

// export const updateLecturer = createAsyncThunk(
//   "lecture/update",
//   async ({ id, data }) => {
//     const res = await EnrollmentService.update(id, {...data,batches:[],lecturerBatches:[]});
//     return res.data;
//   }
// );

// export const deleteLecturer = createAsyncThunk(
//   "lecture/delete",
//   async ( {id} ) => {
    
//     await EnrollmentService.remove(id);
//     return id ;
//   }
// );
  
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
    // [updateLecturer.fulfilled]: (state, action) => {
    //   const index = state.lecturerList.findIndex(
    //     (lecturer) => lecturer.lecturerId === action.payload.id
    //   );
    //   state.lecturerList[index] = {
    //     ...state[index],
    //     ...action.payload,
    //   };
    // },
    // [deleteLecturer.fulfilled]: (state, action) => {
    //   let index = state.lecturerList.findIndex(({ lecturerId }) => lecturerId === action.payload);
    //   state.lecturerList.splice(index, 1);
    // },
  },
});

const { reducer } = enrollmentSlice;
export default reducer;
