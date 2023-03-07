import { Grid } from "@mui/material";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BatchForm from "./form";
import PaymentShedule from "./paymentShedule";
import BatchDiscount from "./batchDiscount";

const BatchManagement = () => {
  const { id } = useParams();
  const [batchId, setBatchId] = useState();

  return (
    <Grid container>
      <Grid item xs={12}>
        <BatchForm id={id} />
      </Grid>
      <Grid item xs={12}>
        {/* {id != 'null' && <PaymentShedule batchId={id} />} */}
      </Grid>
      <Grid item xs={12}>
        {id != 'null' && <BatchDiscount batchId={id} />}
      </Grid>
    </Grid>
  );
};

export default BatchManagement;
