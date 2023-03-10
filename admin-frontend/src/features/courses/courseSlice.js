import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import CourseService from "./service";

const coursesAdapter = createEntityAdapter();


export const createCourse = createAsyncThunk(
  "courses/create",
  async (course) => {
    const res = await CourseService.create({ ...course, batches: null });
    return res.data;
  }
);

export const retrieveCourses = createAsyncThunk(
  "courses/retrieve",
  async () => {
    const res = await CourseService.getAll();
    return res.data;
  }
);

export const updateCourse = createAsyncThunk(
  "courses/update",
  async ({ id, data }) => {
    const res = await CourseService.update(id, data);
    return res.data;
  }
);

export const deleteCourse = createAsyncThunk(
  "courses/delete",
  async ({ id }) => {
    await CourseService.remove(id);
    return { id };
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState: coursesAdapter.getInitialState({ status: {retrievingStatus:"",modifyingStatus:""}, error:null,operation:"" }),
  reducers: {
    resetModifying: (state) => {
      state.status.modifyingStatus = "idle";
      state.status.retrievingStatus = "idle";
    },
  },
  extraReducers: {
    [createCourse.pending]: (state, action) => {
      state.operation="inserting";
      state.status.modifyingStatus="pending";
    },
    [createCourse.fulfilled]: (state, action) => {
      coursesAdapter.addOne(state,{...action.payload,id:action.payload.courseId})
      state.operation = "inserting";
      state.status.modifyingStatus = "succeeded";
    },
    [createCourse.rejected]: (state, action) => {
      state.operation = "inserting";
      state.status.modifyingStatus = "failed";
      state.error = action.error;
    },
    [retrieveCourses.pending]: (state, action) => {
      state.status.retrievingStatus = 'loading'
      state.operation = "loading" 
    },
    [retrieveCourses.fulfilled]: (state, action) => {
      state.status.retrievingStatus = 'succeeded'
      state.operation="loading"
      coursesAdapter.addMany(state, action.payload.map(course =>  {return {id:course.courseId, ...course}}))
    },
    [retrieveCourses.rejected]: (state, action) => {
      state.operation = "loading";
      state.status.retrievingStatus = "failed";
      state.error = action.error;
    },
    [updateCourse.pending]: (state, action) => {
      state.operation = "updating";
      state.status.modifyingStatus = "pending";
    },
    [updateCourse.fulfilled]: (state, action) => {
      coursesAdapter.updateOne(state,{id:action.payload.courseId,changes:action.payload})
      state.operation = "updating";
      state.status.modifyingStatus = "succeeded";
    },
    [updateCourse.rejected]: (state, action) => {
      state.operation = "updating";
      state.status.modifyingStatus = "failed";
      state.error = action.error;
    },
    [deleteCourse.pending]: (state, action) => {
      state.operation = "deleting";
      state.status.modifyingStatus = "pending";
    },
    [deleteCourse.fulfilled]: (state, action) => {
      coursesAdapter.removeOne(state, action.payload.id)
      state.operation = "deleting";
      state.status.modifyingStatus = "succeeded";
    },
    [deleteCourse.rejected]: (state, action) => {
      state.operation = "deleting";
      state.status.modifyingStatus = "failed";
      state.error = action.error;
    },
    
  },
});

const { reducer } = courseSlice;
export default reducer;

export const { selectAll, selectById } = coursesAdapter.getSelectors();
export const { resetModifying } = courseSlice.actions;

export const getAllCourses = coursesAdapter.getSelectors(
	(state) => state.courses
);
;
