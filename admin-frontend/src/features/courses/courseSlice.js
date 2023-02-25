import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import CourseService from "./service";

const coursesAdapter = createEntityAdapter();

//const initialState = { courseList: [], status: "idle", error: null };

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
  initialState: coursesAdapter.getInitialState({ status: false, error:null }),
  extraReducers: {
    [createCourse.fulfilled]: (state, action) => {
      coursesAdapter.addOne(state, action.payload)
    },
    [retrieveCourses.pending]: (state, action) => {
      state.status = 'loading'
    },
    [retrieveCourses.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      coursesAdapter.addMany(state, action.payload.map(course =>  {return {id:course.courseId, ...course}}))
    },
    [retrieveCourses.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
    [updateCourse.fulfilled]: (state, action) => {
      coursesAdapter.updateOne(state, action.payload)
    },
    [deleteCourse.fulfilled]: (state, action) => {
      coursesAdapter.removeOne(state, action.payload.id)
    },
  },
});

const { reducer } = courseSlice;
export default reducer;

export const { selectAll, selectById } = coursesAdapter.getSelectors();

export const getAllCourses = coursesAdapter.getSelectors(
	(state) => state.courses
);

export const getCourseById = coursesAdapter.getSelectors(
	(state) => state.courses
);
