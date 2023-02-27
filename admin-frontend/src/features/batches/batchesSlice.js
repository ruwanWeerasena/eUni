import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import BatchService from "./service";

const initialState = {batchList:[], status: "idle", error: null};

export const createBatch = createAsyncThunk(
"batches/create",
async (branch) => {
  const res = await BatchService.create({...branch, batches:null});
  return res.data;
}
);

export const retrieveBatches = createAsyncThunk(
"batches/retrieve",
async () => {
  const res = await BatchService.getAll();
  return res.data;
}
);

export const updateBatch = createAsyncThunk(
"batches/update",
async ({ id, data }) => {
  const res = await BatchService.update(id, data);
  return res.data;
}
);

export const deleteBatch = createAsyncThunk(
"batches/delete",
async ({ id }) => {
  await BatchService.remove(id);
  return { id };
}
);

export const retrieveBatchByCourse = createAsyncThunk(
  "batches/CourseId/retrieve",
  async ({id})=>{
    const res = await BatchService.getByCourseId(id);
    return res.data;
  }
);

const branchSlice = createSlice({
name: "batches",
initialState,
extraReducers: {
  [createBatch.fulfilled]: (state, action) => {
    state.batchList.push(action.payload);
  },
  [retrieveBatches.pending]: (state, action) => {
    return {...state, status:'loading'}
  },
  [retrieveBatches.fulfilled]: (state, action) => {
    return {batchList:[...action.payload], status:'succeeded'}
  },
  [retrieveBatches.rejected]: (state, action) => {
    return {...state,status:'failed', error:action.payload}
  },
  [updateBatch.fulfilled]: (state, action) => {
    const index = state.findIndex(
      (tutorial) => tutorial.id === action.payload.id
    );
    state.batchList[index] = {
      ...state[index],
      ...action.payload,
    };
  },
  [deleteBatch.fulfilled]: (state, action) => {
    let index = state.findIndex(({ id }) => id === action.payload.id);
    state.batchList.splice(index, 1);
  },
  [retrieveBatchByCourse.pending]:(state,action)=>{
    return {...state,status:'loading'}
  },
  [retrieveBatchByCourse.fulfilled]:(state,action)=>{
    console.log(23,action)
    return {batchList:[...action.payload], status:'succeeded'}
  }
},
});

const { reducer } = branchSlice;
export default reducer;
