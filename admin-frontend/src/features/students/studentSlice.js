import {
    createSlice,
    createAsyncThunk,
  } from "@reduxjs/toolkit";

import StudentService from "./service";
  
const initialState = {studentlist:[], status: {retrievingStatus:"",modifyingStatus:""}, operation: "", error: null};

export const createStudent = createAsyncThunk(
  "student/create",
  async (student) => {
    
    const res = await StudentService.create({...student, enrollments:[],studentPayments:[]});
    return res.data;
  }
);

export const retrieveStudent = createAsyncThunk(
  "student/retrieve",
  async () => {
    const res = await StudentService.getAll();
    return res.data;
  }
);



export const updateStudent = createAsyncThunk(
  "student/update",
  async ({ id, data }) => {
    const res = await StudentService.update(id, data);
    return res.data;
  }
);

export const deleteStudent = createAsyncThunk(
  "student/delete",
  async ({ id }) => {
     await StudentService.remove(id);
    
    return  id ;
  }
);
  
const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    resetModifying: (state) => {
      state.status.retrievingStatus = "idle";
    },
  },
  extraReducers: {
    [createStudent.pending]: (state, action) => {
      state.status.modifyingStatus = "pending";
      state.operation = "inserting";
    },
    [createStudent.fulfilled]: (state, action) => {
      state.studentlist.push(action.payload);
      state.operation = "inserting";
      state.status.modifyingStatus = "succeeded";
    },
    [createStudent.rejected]: (state, action) => {
      state.operation = "inserting";
      state.status.modifyingStatus = "failed";
      state.error = action.error;
    },
    [retrieveStudent.pending]:(state,action)=>{
      state.status.retrievingStatus='loading';
      state.operation = "loading" 
    },
    [retrieveStudent.fulfilled]: (state, action) => {
      return {...state,studentlist:[...action.payload], operation:"loading",status:{retrievingStatus:"succeeded"}}
    },
    [retrieveStudent.rejected]:(state,action)=>{
      state.operation = "loading";
      state.status.retrievingStatus = "failed";
      state.error = action.error;
    },
    [updateStudent.pending]: (state, action) => {
      state.operation = "updating";
      state.status.modifyingStatus = "pending";
    },
    
    [updateStudent.fulfilled]: (state, action) => {
      const index = state.studentlist.findIndex(
        (student) => student.studentId === action.payload.studentId
      );
      state.studentlist[index] = {
        ...state.studentlist[index],
        ...action.payload,
      };
      state.operation = "updating";
      state.status.modifyingStatus = "succeeded";
    },
    [updateStudent.rejected]: (state, action) => {
      state.operation = "updating";
      state.status.modifyingStatus = "failed";
      state.error = action.error;
    },
    [deleteStudent.pending]: (state, action) => {
      state.operation = "deleting";
      state.status.modifyingStatus = "pending";
    },
    [deleteStudent.fulfilled]: (state, action) => {
      let index = state.studentlist.findIndex(({ studentId }) => studentId === action.payload);
      state.studentlist.splice(index, 1);
      state.operation = "deleting";
      state.status.modifyingStatus = "succeeded";
    },
    [deleteStudent.rejected]: (state, action) => {
      state.operation = "deleting";
      state.status.modifyingStatus = "failed";
      state.error = action.error;
    },
  },
});

const { reducer } = studentSlice;
export const { resetModifying } = studentSlice.actions;
export default reducer;
