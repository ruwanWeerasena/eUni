import { Grid, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import * as yup from "yup";

import { useSelector, useDispatch } from "react-redux";
import {
  createPaymentShedule,
  updateBatchPaymentShedule,
  deleteBatchPaymentShedule
} from "./paymentShedultSlice";

const validationSchema = yup.object({});

const SheduleManager = ({
  paymentShedule,
  batchId,
  operation,
  setSelectedPaymentShedule,
  setOperation
}) => {
  const dispatch = useDispatch();

  const shedules = useSelector(
    (state) => state.batchPaymentShedules?.paymentSheduleList
  );

  const reset = () => {
    setSelectedPaymentShedule({title:'', paymentDate: new Date(), amount:''});
    setOperation('add')
  }

  const formik = useFormik({
    initialValues: paymentShedule, 
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      switch (operation) {
        case "add":
          console.log('add')
          dispatch(createPaymentShedule({ ...values, batchId: batchId }));
          break;
        case "edit":
          dispatch(
            updateBatchPaymentShedule({
              id: paymentShedule.batchPaymentSheduleId,
              data: {
                ...values,
                batchPaymentSheduleId: paymentShedule.batchPaymentSheduleId,
                batchId: batchId,
              },
            })
          );
          break;
        case "delete":
          dispatch(deleteBatchPaymentShedule({id:paymentShedule.batchPaymentSheduleId}));
          break;
      }

    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container>
        <Grid item xs={1}>
          {paymentShedule.batchPaymentSheduleId && (
            <Button
              onClick={() => reset()}
              variant="outlined"
            >
              Reset
            </Button>
          )}
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            id="title"
            name="title"
            label="title"
            value={formik.values?.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
        </Grid>
        <Grid item xs={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              id="paymentDate"
              name="paymentDate"
              value={formik.values?.paymentDate}
              onChange={(date) => formik.setFieldValue("paymentDate", date)}
              renderInput={(props) => <TextField {...props} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={3}>
          <TextField
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            fullWidth
            id="amount"
            name="amount"
            label="amount"
            value={formik.values?.amount}
            onChange={formik.handleChange}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
          />
        </Grid>
        <Grid item xs={1}>
          <Button type="submit" variant="outlined">
            {paymentShedule.batchPaymentSheduleId
              ? operation === "edit"
                ? "Update"
                : "Delete"
              : "Add"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SheduleManager;
