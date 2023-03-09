
import { Grid } from "@mui/material";
import { useState } from "react";
import BatchDiscountManager from "./BatchDiscountManager";
import BatchDiscountGrid from "./BatchDiscountGrid";
import { Formik } from 'formik';
import * as yup from "yup";
import { useDispatch } from "react-redux";
import {
  createBatchDiscount,
  updateBatchDiscount,
  deleteBatchDiscount
} from "./batchDiscountSlice";

const BatchDiscount = ({ batchId }) => {
  const dispatch = useDispatch();
  const [selectedBatchDiscount, setSelectedBatchDiscount] = useState({
    criteria: "",
    discountType:"",
    amount: "",
    percentage:"",
    batchId:batchId
  });
  const [operation, setOperation] = useState("add");
  const validationSchema = yup.object({
    criteria: yup.string().required("required"),
    discountType:yup.string().required("required")
  
  
  });
  
  const onsubmit = (values)=>{
    switch (operation) {
            case "add":
              values.amount !=""?values.percentage=0:values.amount=0;
              dispatch(createBatchDiscount({ ...values, batchId: batchId }));
              break;
            case "edit":
              console.log("uedit");
              dispatch(
                updateBatchDiscount({
                  id: selectedBatchDiscount.batchDiscountId,
                  data: {
                    ...values,
                    batchDiscountId: selectedBatchDiscount.batchDiscountId,
                    batchId: batchId,
                  },
                })
              );
              break;
            case "delete":
              dispatch(deleteBatchDiscount({id:selectedBatchDiscount.batchDiscountId}));
              break;
            default:
              break;
          }
  }
const initialvalues = {
                  criteria:selectedBatchDiscount.criteria,
                  discountType:selectedBatchDiscount.discountType,
                  amount:selectedBatchDiscount.amount,
                  percentage:selectedBatchDiscount.percentage
                }
  return (
    <Grid container>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialvalues}
        enableReinitialize
        onSubmit={ (values) => onsubmit(values)}
      
      >
        <Grid item xs={12}>
          <BatchDiscountManager
            batchId={batchId}
            setSelectedBatchDiscount={setSelectedBatchDiscount}
            batchDiscount={selectedBatchDiscount}
            operation={operation}
            setOperation={setOperation}
          />
        </Grid>
      </Formik>
      <Grid item xs={12}>
        <BatchDiscountGrid
          batchId={batchId}
          setOperation={setOperation}
          setSelectedBatchDiscount={setSelectedBatchDiscount}
        />
      </Grid>
    </Grid>
  );
};

export default BatchDiscount;
