import { Grid, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import * as yup from "yup";

import { useSelector, useDispatch } from "react-redux";
import { createPaymentShedule, updateBatchPaymentShedule } from "./paymentShedultSlice";

const validationSchema = yup.object({});

const batchPaymentShedule = { title: "", paymentDate: new Date() };

const SheduleManager = ({ paymentSheduleId, batchId }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: batchPaymentShedule,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("submit", values);
      
      if (paymentSheduleId) {
        updateBatchPaymentShedule({id:paymentSheduleId, data: {...values, batchPaymentSheduleId:paymentSheduleId}})
      } else {
        dispatch(createPaymentShedule(values))
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container>
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
        <Grid item xs={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              id="paymentDate"
              name="paymentDate"
              value={formik.values.paymentDate}
              onChange={(date) => formik.setFieldValue("paymentDate", date)}
              renderInput={(props) => <TextField {...props} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={4}>
          <Button type="submit" variant="outlined">
            {paymentSheduleId ? "Update" : "Add"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SheduleManager;
