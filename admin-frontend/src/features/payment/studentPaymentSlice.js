import {
    createSlice,
    createAsyncThunk,
  } from "@reduxjs/toolkit";

  import StudentPaymentService from "./service";
  
const initialState = {
  studentPaymentList:[], 
  status:{
    modifyingStatus:"idle",
    retrievingStatus:"idle",
  }, 
  operation: "",
  error: null
};

export const createPayment = createAsyncThunk(
  "payment/create",
  async (payment) => {
    
    const res = await StudentPaymentService.create(payment);
    return res.data;
  }
);


export const retrievePayments = createAsyncThunk(
  "payment/retrieveAll",
  async () => {
    const res = await StudentPaymentService.getAll();
    return res.data;
  }
);

export const retrievePaymentsById = createAsyncThunk(
  "payment/retrieve",
  async (id) => {
    const res = await StudentPaymentService.get(id);
    return res.data;
  }
);


  
const studentPaymentSlice = createSlice({
  name: "studentPayments",
  initialState,
  reducers: {
    resetModifying: (state) => {
      state.status.modifyingStatus="idle";
      state.status.retrievingStatus="idle";
      
    },
  },
  extraReducers: {
    [createPayment.pending]: (state, action) => {
      state.status.modifyingStatus = "pending";
      state.operation = "inserting";
    },
    [createPayment.fulfilled]: (state, action) => {
      state.studentPaymentList.push(action.payload);
      state.operation = "inserting";
      state.status.modifyingStatus = "succeeded";
    },
    [createPayment.rejected]: (state, action) => {
      state.operation = "inserting";
      state.status.modifyingStatus = "failed";
      state.error = action.error;
    },


    [retrievePayments.pending]: (state, action) => {
      return {...state, status:{retrievingStatus:'loading'},operation:"loading"}
    },
    [retrievePayments.fulfilled]: (state, action) => {
      return {...state,studentPaymentList:action.payload,operation:"loading",status:{retrievingStatus:"succeeded"}}
    },
    [retrievePayments.rejected]: (state, action) => {
      return {...state,status:{retrievingStatus:"failed"},operation:"loading",error:action.payload}
    },

    [retrievePaymentsById.pending]: (state, action) => {
      return {...state, status:{retrievingStatus:'loading'},operation:"loading"}
    },
    [retrievePaymentsById.fulfilled]: (state, action) => {
      return {...state,studentPaymentList:action.payload,operation:"loading",status:{retrievingStatus:"succeeded"}}
    },
    [retrievePaymentsById.rejected]: (state, action) => {
      return {...state,status:{retrievingStatus:"failed"},operation:"loading",error:action.payload}
    },

  },
});

const { reducer } = studentPaymentSlice;
export const { resetModifying } = studentPaymentSlice.actions;
export default reducer;
