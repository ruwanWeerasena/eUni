import { Grid, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import {  useDispatch } from "react-redux";
import {
  createBatchDiscount,
  updateBatchDiscount,
  deleteBatchDiscount
} from "./batchDiscountSlice";

const validationSchema = yup.object({
  criteria: yup.string().required("required"),
  amount: yup.number().required("required"),
  discountType: yup.string().required("required"),
  percentage: yup.number().required("required")
});

const BatchDiscountManager = ({
  batchDiscount,
  batchId,
  operation,
  setSelectedBatchDiscount,
  setOperation
}) => {
  const dispatch = useDispatch();

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
      <Grid container spacing={1}>
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
        <Grid item xs={2}>
          <TextField
            fullWidth
            id="criteria"
            name="criteria"
            label="criteria"
            value={formik.values?.criteria}
            onChange={formik.handleChange}
            error={formik.touched.criteria && Boolean(formik.errors.criteria)}
            helperText={formik.touched.criteria && formik.errors.criteria}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
              fullWidth
              id="discountType"
              name="discountType"
              label="discountType"
              value={formik.values?.discountType}
              onChange={formik.handleChange}
              error={formik.touched.discountType && Boolean(formik.errors.discountType)}
              helperText={formik.touched.discountType && formik.errors.discountType}
            />
        </Grid>
        <Grid item xs={2}>
          <TextField
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
        <Grid item xs={2}>
          <TextField
            fullWidth
            id="percentage"
            name="percentage"
            label="percentage"
            value={formik.values?.percentage}
            onChange={formik.handleChange}
            error={formik.touched.percentage && Boolean(formik.errors.percentage)}
            helperText={formik.touched.percentage && formik.errors.percentage}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            id="batchId"
            name="batchId"
            label="batchId"
            value={formik.values?.batchId}
            onChange={formik.handleChange}
            error={formik.touched.batchId && Boolean(formik.errors.batchId)}
            helperText={formik.touched.batchId && formik.errors.batchId}
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
