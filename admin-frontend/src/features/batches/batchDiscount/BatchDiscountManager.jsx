import { Grid, TextField, Button,Select ,FormControl,InputLabel,MenuItem} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import {  useDispatch } from "react-redux";
import {
  createBatchDiscount,
  updateBatchDiscount,
  deleteBatchDiscount
} from "./batchDiscountSlice";




const BatchDiscountManager = ({
  batchDiscount,
  batchId,
  operation,
  setSelectedBatchDiscount,
  setOperation
}) => {

const [discountType ,setDiscountType] = useState({type:"",error:false,touched:false});

const validationSchema = yup.object({
  criteria: yup.string().required("required"),


});

  const dispatch = useDispatch();

  const reset = () => {
    setSelectedBatchDiscount({criteria:'', discountType:discountType, amount:"",percentage:"",batchId:batchId});
    setOperation('add')
  }

  const formik = useFormik({
    initialValues: batchDiscount, 
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("dd");
      switch (operation) {
        case "add":
          console.log('add',values)
          values.amount !=""?values.percentage=0:values.amount=0;
          if(discountType.type==""){
            setDiscountType({...discountType,error:true,touched:true})
          }else{
            
            dispatch(createBatchDiscount({ ...values,discountType:discountType.type, batchId: batchId }));
          }
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
          console.log("default");
          break;
      }

    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={1}>
        
        <Grid item xs={5}>
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
        <Grid item xs={3}>
            <FormControl fullWidth>
            <InputLabel id="discountTypeLabel">Discount Type</InputLabel>
            <Select
              labelId="discountTypeLabel"
              id="discountType"
              name="discountType"
              value={discountType.type}
              error={discountType.touched && Boolean(discountType.error)}
              helperText={discountType.touched && discountType.touched}
   
              onChange={({target})=>{
                setDiscountType({...discountType,type:target.value,error:false,touched:"true"});
              }}
            >
              <MenuItem value="PERCENTAGE">PERCENTAGE</MenuItem>
              <MenuItem value="AMOUNT">AMOUNT</MenuItem>
            
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2} >

          {discountType.type==="AMOUNT"?
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
          :
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
        }
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
      </Grid>
    </form>
  );
};

export default BatchDiscountManager;
