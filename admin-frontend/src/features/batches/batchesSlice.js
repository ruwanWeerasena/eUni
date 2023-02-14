import {
  createSlice,
  createSelector,
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

    const sessionValue = sessionStorage.getItem("00000000-0000-0000-c6da-854a5b374880.9188040d-6c67-4c5b-b112-36a304b66dad-login.windows.net-idtoken-f7931e5a-b318-4f08-94ea-b234ac009471-fd8a5809-4fda-4970-af8f-cb5995749eb0---");
    const accessToken = JSON.parse(sessionValue).secret;

    

    console.log("access token", accessToken);

    const response = await axios.get(process.env.REACT_APP_API_URL + "/batch", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
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
