import SheduleManager from "./SheduleManager";
import SheduleGrid from "./SheduleGrid";
import { Grid } from "@mui/material";
import { useState } from "react";
import { Box } from "@mui/system";

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
        <Box mb={5} mt={2}>
        <SheduleManager
          batchId={batchId}
          setSelectedPaymentShedule={setSelectedPaymentShedule}
          paymentShedule={selectedPaymentShedule}
          operation={operation}
          setOperation={setOperation}
          />
          </Box>
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
