import { configureStore, combineReducers } from "@reduxjs/toolkit";

import batchesReducer from "./features/batches/batchesSlice";
import staffsReducer from "./features/staffs/staffSlice";
import branchesReducer from "./features/branches/branchSlice";
import studentsReducer from "./features/students/studentSlice";
import lecturerReducer from "./features/lecturers/lecturerSlice";
import coursesReducer from "./features/courses/courseSlice";
import notificationReducer from "./features/notifications/notificationSlice";
import enrollmentsReducer from './features/enrollments/enrollmentSlice';
import batchPaymentSheduleReducer from './features/batches/paymentShedule/paymentShedultSlice';
import batchDiscountReducer from './features/batches/batchDiscount/batchDiscountSlice'
import batchTimeSheduleReducer from './features/batches/timeShedule/timeSheduleSlice'

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  batches: batchesReducer,
  staffs: staffsReducer,
  branches: branchesReducer,
  students: studentsReducer,
  lecturers: lecturerReducer,
  courses: coursesReducer,
  notification: notificationReducer,
  enrollments: enrollmentsReducer,
  batchPaymentShedules: batchPaymentSheduleReducer,
  batchDiscounts:batchDiscountReducer,
  batchTimeShedules: batchTimeSheduleReducer,
});

export const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

