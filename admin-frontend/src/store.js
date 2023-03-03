import { configureStore, combineReducers } from "@reduxjs/toolkit";

import batchesReducer from "./features/batches/batchesSlice";
import staffsReducer from "./features/staffs/staffSlice";
import branchesReducer from "./features/branches/branchSlice";
import studentsReducer from "./features/students/studentSlice";
import lecturerReducer from "./features/lecturers/lecturerSlice";
import coursesReducer from "./features/courses/courseSlice";
import notificationReducer from "./features/notifications/notificationSlice";

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  batches: batchesReducer,
  staffs: staffsReducer,
  branches: branchesReducer,
  students: studentsReducer,
  lecturers: lecturerReducer,
  courses: coursesReducer,
  notification: notificationReducer,
});

// const store = configureStore({
//   reducer: {
//     // Define a top-level state field named `todos`, handled by `todosReducer`
//     batches: batchesReducer,
//     staffs: staffsReducer,
//     branches: branchesReducer,
//     students: studentsReducer,
//     lecturers: lecturerReducer,
//     courses: coursesReducer,
//     notification: notificationReducer,
//   },
// });

export const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

//export default store;
