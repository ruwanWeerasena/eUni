import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const batchesAdapter = createEntityAdapter({
  selectId: (batch) => batch.batchId,
});

const initialState = batchesAdapter.getInitialState({ status: "idle" });

// Thunk functions
export const fetchesBatches = createAsyncThunk(
  "batch/fetchBatches",
  async () => {
    const response = await axios.get(process.env.REACT_APP_API_URL + "/batch");
    console.log('response', response);
    return response.data;
  }
);

const batchesSlice = createSlice({
  name: "batches",
  initialState,
  reducers: {
    // todoToggled(state, action) {
    //   const todoId = action.payload;
    //   const todo = state.entities[todoId];
    //   todo.completed = !todo.completed;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchesBatches.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchesBatches.fulfilled, (state, action) => {
        console.log("adapter", action.payload);
        batchesAdapter.setAll(state, action.payload);
        state.status = "idle";
      });
  },
});

export const { todoToggled } = batchesSlice.actions;

export default batchesSlice.reducer;

// export const { selectAll: selectTodos, selectById: selectTodoById } =
//   todosAdapter.getSelectors((state) => state.todos);

//export const batches = createSelector((state) => state);

export const { selectAll: selectBatches, selectById: selectBatchById } =
  batchesAdapter.getSelectors((state) => state.batches);
