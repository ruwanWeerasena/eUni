
import { Grid } from "@mui/material";
import { useState } from "react";
import BatchDiscountManager from "./BatchDiscountManager";
import BatchDiscountGrid from "./BatchDiscountGrid";

const BatchDiscount = ({ batchId }) => {
  const [selectedBatchDiscount, setSelectedBatchDiscount] = useState({
    criteria: "",
    discountType: "",
    amount: "",
    percentage:"",
    batchId:batchId
  });
  const [operation, setOperation] = useState("add");

  return (
    <Grid container>
      <Grid item xs={12}>
        <BatchDiscountManager
          batchId={batchId}
          setSelectedBatchDiscount={setSelectedBatchDiscount}
          BatchDiscount={selectedBatchDiscount}
          operation={operation}
          setOperation={setOperation}
        />
      </Grid>
      {/* <Grid item xs={12}>
        <BatchDiscountGrid
          batchId={batchId}
          setOperation={setOperation}
          setSelectedBatchDiscount={setSelectedBatchDiscount}
        />
      </Grid> */}
    </Grid>
  );
};

export default BatchDiscount;
