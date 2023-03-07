import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const BatchDiscountItem = ({
  discountItem,
  setSelectedBatchDiscount,
  setOperation,
}) => { 
  const edit = (item) => {
    setOperation("edit");
    setSelectedBatchDiscount(item);
  };

  const del = (item) => {
    setOperation("delete");
    setSelectedBatchDiscount(item);
  };

  return (
    <Grid container>
      <Grid item xs={2}>
        <TextField
          type="text"
          value={discountItem.criteria}
          variant="outlined"
          inputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          type="text"
          value={discountItem.discountType}
          variant="outlined"
          inputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          type="text"
          value={discountItem.percentage}
          variant="outlined"
          inputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          type="text"
          value={discountItem.amount}
          variant="outlined"
          inputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          type="text"
          value={discountItem.batchId}
          variant="outlined"
          inputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={() => edit(discountItem)} aria-label="update">
          <EditIcon />
        </IconButton>
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={() => del(discountItem)} aria-label="update">
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default BatchDiscountItem;
