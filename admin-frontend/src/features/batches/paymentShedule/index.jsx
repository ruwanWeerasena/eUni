import SheduleManager from "./SheduleManager";
import SheduleGrid from "./SheduleGrid";
import { Grid } from "@mui/material";
import { useState } from "react";

const PaymentShedule = ({ batchId }) => {
  const [selectedPaymentShedule, setSelectedPaymentShedule] = useState({
    title: "",
    paymentDate: new Date(),
    amount: "",
  });
  const [operation, setOperation] = useState("add");

  return (
    <Grid container>
      <Grid item xs={12}>
        <SheduleManager
          batchId={batchId}
          setSelectedPaymentShedule={setSelectedPaymentShedule}
          paymentShedule={selectedPaymentShedule}
          operation={operation}
          setOperation={setOperation}
        />
      </Grid>
      <Grid item xs={12}>
        <SheduleGrid
          batchId={batchId}
          setOperation={setOperation}
          setSelectedPaymentShedule={setSelectedPaymentShedule}
        />
      </Grid>
    </Grid>
  );
};

export default PaymentShedule;
