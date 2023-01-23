import { configureStore } from '@reduxjs/toolkit'

import batchesReducer from './features/batches/batchesSlice'

const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    batches: batchesReducer,
  },
})

export default store
