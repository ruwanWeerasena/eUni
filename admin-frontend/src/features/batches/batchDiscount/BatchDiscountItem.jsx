import React, { useState } from "react";
import { Grid,  Typography } from "@mui/material";

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
    <Grid item xs={12} sx={{borderBottom:1, display:"flex", margin:1, paddingBottom:1}}>
      <Grid item xs={1}>
        <Typography>{discountItem.BatchDiscountId}</Typography>
      </Grid>
      <Grid item xs={2}>
      
        <Typography>{discountItem.criteria}</Typography>
      </Grid>
      <Grid item xs={2}>
  
        <Typography>{discountItem.discountType}</Typography>
      </Grid>
      <Grid item xs={2}>
 
        <Typography>{discountItem.percentage}</Typography>
      </Grid>
      <Grid item xs={2}>
      
        <Typography>{discountItem.amount}</Typography>
      </Grid>
      <Grid item xs={2}>
    
      </Grid>
      <Typography>{discountItem.batchId}</Typography>
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
