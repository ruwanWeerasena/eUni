import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const PaymentSheduleItem = ({
  sheduleItem,
  setSelectedPaymentShedule,
  setOperation,
}) => {
  const edit = (item) => {
    setOperation("edit");
    setSelectedPaymentShedule(item);
  };

  const del = (item) => {
    setOperation("delete");
    setSelectedPaymentShedule(item);
  };

  return (
    <Grid container>
      <Grid item xs={1}>
        <TextField
          type="text"
          value={sheduleItem.batchPaymentSheduleId}
          variant="outlined"
          inputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="text"
          value={sheduleItem.title}
          variant="outlined"
          inputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="text"
          value={sheduleItem.amount}
          variant="outlined"
          inputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="text"
          value={sheduleItem.paymentDate}
          variant="outlined"
          inputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={() => edit(sheduleItem)} aria-label="update">
          <EditIcon />
        </IconButton>
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={() => del(sheduleItem)} aria-label="update">
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default PaymentSheduleItem;
