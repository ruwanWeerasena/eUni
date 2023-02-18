import { configureStore } from '@reduxjs/toolkit'

import batchesReducer from './features/batches/batchesSlice'
import staffsReducer from './features/staffs/staffSlice'

const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    batches: batchesReducer,
    staffs: staffsReducer,
  },
})

export default store
