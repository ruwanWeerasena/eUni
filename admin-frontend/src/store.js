import { configureStore } from '@reduxjs/toolkit'

import batchesReducer from './features/batches/batchesSlice'
import staffsReducer from './features/staffs/staffSlice'
import branchesReducer from './features/branches/branchSlice'
import studentsReducer from './features/students/studentSlice'
import lecturerReducer from './features/lecturers/lecturerSlice'
import coursesReducer from './features/courses/courseSlice'
import enrollmentsReducer from './features/enrollments/enrollmentSlice'

const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    batches: batchesReducer,
    staffs: staffsReducer,
    branches: branchesReducer,
    students: studentsReducer,
    lecturers: lecturerReducer,
    courses: coursesReducer,
    enrollments :enrollmentsReducer
  },
})

export default store
