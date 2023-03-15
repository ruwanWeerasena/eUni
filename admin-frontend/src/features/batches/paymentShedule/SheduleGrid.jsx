import React, { useEffect, useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import PaymentSheduleItem from "./PaymentSheduleItem";

import { useSelector, useDispatch } from "react-redux";
import { retrieveBatchPaymentShedules } from "./paymentShedultSlice";

const SheduleGrid = ({ batchId, setOperation, setSelectedPaymentShedule }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveBatchPaymentShedules());
  }, [batchId]);

  const shedules = useSelector(
    (state) => state.batchPaymentShedules?.paymentSheduleList.filter((s)=>s.batchId==batchId)
  );

  return (
    <Grid container>
      {shedules?.map((shedule) => (
        <PaymentSheduleItem
          key={shedule.batchPaymentSheduleId}
          sheduleItem={shedule}
          setSelectedPaymentShedule={setSelectedPaymentShedule}
          setOperation={setOperation}
        />
      ))}
    </Grid>
  );
};

export default SheduleGrid;
