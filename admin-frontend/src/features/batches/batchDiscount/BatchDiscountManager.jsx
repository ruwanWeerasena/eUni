import { Grid, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import * as yup from "yup";

import { useSelector, useDispatch } from "react-redux";
import {
  createBatchDiscount,
  updateBatchDiscount,
  deleteBatchDiscount
} from "./batchDiscountSlice";

const validationSchema = yup.object({});

const BatchDiscountManager = ({
  batchDiscount,
  batchId,
  operation,
  setSelectedBatchDiscount,
  setOperation
}) => {
  const dispatch = useDispatch();

  const discounts = useSelector(
    (state) => state.batchdiscount?.batchdiscountList
  );

  // const discountslist = discounts.filter((d)=>d.batchId==batchId)
  console.log(discounts);

  const reset = () => {
    setSelectedBatchDiscount({criteria:'', discountType: "", amount:'',percentage:'',batchId:batchId});
    setOperation('add')
  }

  const formik = useFormik({
    initialValues: batchDiscount, 
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      switch (operation) {
        case "add":
          console.log('add')
          dispatch(createBatchDiscount({ ...values, batchId: batchId }));
          break;
        case "edit":
          dispatch(
            updateBatchDiscount({
              id: batchDiscount.batchDiscountId,
              data: {
                ...values,
                batchDiscountId: batchDiscount.batchDiscountId,
                batchId: batchId,
              },
            })
          );
          break;
        case "delete":
          dispatch(deleteBatchDiscount({id:batchDiscount.batchDiscountId}));
          break;
        default:
          break;
      }

    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container>
        <Grid item xs={1}>
          {batchDiscount.batchDiscountId && (
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
            id="criteria"
            name="criteria"
            label="criteria"
            value={formik.values?.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
        </Grid>
        <Grid item xs={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              id="discountType"
              name="discountType"
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
        <Grid item xs={3}>
          <TextField
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            fullWidth
            id="percentage"
            name="percentage"
            label="percentage"
            value={formik.values?.amount}
            onChange={formik.handleChange}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            fullWidth
            id="batchId"
            name="batchId"
            label="batchId"
            value={formik.values?.amount}
            onChange={formik.handleChange}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
          />
        </Grid>
        <Grid item xs={1}>
          <Button type="submit" variant="outlined">
            {batchDiscount.batchDiscountId
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

export default BatchDiscountManager;
