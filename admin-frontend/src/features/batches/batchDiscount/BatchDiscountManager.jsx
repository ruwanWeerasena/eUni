import { Grid, TextField, Button,Select ,FormControl,InputLabel,MenuItem} from "@mui/material";
import React from "react";

import {  Field, Form,useFormikContext } from 'formik';

const BatchDiscountManager = ({
  batchDiscount,
  batchId,
  operation,
  setSelectedBatchDiscount,
  setOperation
}) => {

  const {
    values: { discountType },
  } = useFormikContext();


  const reset = () => {
    setSelectedBatchDiscount({criteria:'', discountType:"", amount:"",percentage:"",batchId:batchId});
    setOperation('add')
  }



  return (
    <Form>
      <Grid container spacing={1}>
        
        <Grid item xs={5}>
        <Field name="criteria">

          {
              ({field})=>{
                  return <TextField
                  fullWidth
                  id="criteria"
                  name="criteria"
                  label="criteria"
                  {...field}
                
                />
              }
          }
          
          </Field>
        </Grid>
        <Grid item xs={3}>
            <FormControl fullWidth>
            <InputLabel id="discountTypeLabel">Discount Type</InputLabel>

            <Field  name="discountType">

              {
                  ({field})=>{
                      return  <Select
                             fullWidth
                             name="discountType"
                          
                             {...field}
                            
                    >
                      <MenuItem key={0} value = "PERCENTAGE" >PERCENTAGE</MenuItem>
                      <MenuItem key={1} value = "AMOUNT">AMOUNT</MenuItem>

                    </Select>
                  }
              }

            </Field>

          </FormControl>
        </Grid>
        <Grid item xs={2} >

          {discountType &&discountType=="AMOUNT"?
            <Field  name="amount">

            {
                ({field})=>{
                    return <TextField
                    fullWidth
                    id="amount"
                    name="amount"
                    label="amount"
                    {...field}
                  
                  />
                }
            }
            
            </Field>
          :
          <Field  name="percentage">

            {
                ({field})=>{
                    return <TextField
                    fullWidth
                    id="percentage"
                    name="percentage"
                    label="percentage"
                    {...field}
                  
                  />
                }
            }
            
            </Field>

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
    </Form>
  );
};

export default BatchDiscountManager;
