import {
    createSlice,
    createAsyncThunk,
  } from "@reduxjs/toolkit";

import StudentService from "./service";
  
const initialState = {studentlist:[], status: "idle", error: null};

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
  extraReducers: {
    [createStudent.fulfilled]: (state, action) => {
      state.studentlist.push(action.payload);
    },
    [retrieveStudent.pending]:(state,action)=>{
      return {...state, status:'loading'}
    },
    [retrieveStudent.fulfilled]: (state, action) => {
      return {studentlist:[...action.payload], status:'succeeded'}
    },
    [retrieveStudent.rejected]:(state,action)=>{
      return {...state,status:'failed', error:action.payload}
    },
    [updateStudent.fulfilled]: (state, action) => {
      const index = state.studentlist.findIndex(
        (student) => student.studentId === action.payload.studentId
      );
      state.studentlist[index] = {
        ...state.studentlist[index],
        ...action.payload,
      };
    },
    [deleteStudent.fulfilled]: (state, action) => {
      let index = state.studentlist.findIndex(({ studentId }) => studentId === action.payload);
      state.studentlist.splice(index, 1);
    },
  },
});

const { reducer } = studentSlice;
export default reducer;
