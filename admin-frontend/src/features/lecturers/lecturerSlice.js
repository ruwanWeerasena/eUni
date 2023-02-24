import {
    createSlice,
    createAsyncThunk,
  } from "@reduxjs/toolkit";

  import LecturerService from "./service";
  
const initialState = {lecturerList:[], status: "idle", error: null};

export const createLecturer = createAsyncThunk(
  "lecture/create",
  async (lecture) => {
    const res = await LecturerService.create({...lecture, batches:[],lecturerBatches:[]});
    return res.data;
  }
);

export const retrieveLecturers = createAsyncThunk(
  "lecture/retrieve",
  async () => {
    const res = await LecturerService.getAll();
    return res.data;
  }
);

export const updateLecturer = createAsyncThunk(
  "lecture/update",
  async ({ id, data }) => {
    const res = await LecturerService.update(id, {...data,batches:[],lecturerBatches:[]});
    return res.data;
  }
);

export const deleteLecturer = createAsyncThunk(
  "lecture/delete",
  async ( {id} ) => {
    
    await LecturerService.remove(id);
    return id ;
  }
);
  
const lecturerSlice = createSlice({
  name: "lecturers",
  initialState,
  extraReducers: {
    [createLecturer.fulfilled]: (state, action) => {
      state.lecturerList.push(action.payload);
    },
    [retrieveLecturers.pending]: (state, action) => {
      return {...state, status:'loading'}
    },
    [retrieveLecturers.fulfilled]: (state, action) => {
      return {lecturerList:[...action.payload], status:'succeeded'}
    },
    [retrieveLecturers.rejected]: (state, action) => {
      return {...state,status:'failed', error:action.payload}
    },
    [updateLecturer.fulfilled]: (state, action) => {
      const index = state.lecturerList.findIndex(
        (lecturer) => lecturer.lecturerId === action.payload.id
      );
      state.lecturerList[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteLecturer.fulfilled]: (state, action) => {
      let index = state.lecturerList.findIndex(({ lecturerId }) => lecturerId === action.payload);
      state.lecturerList.splice(index, 1);
    },
  },
});

const { reducer } = lecturerSlice;
export default reducer;
