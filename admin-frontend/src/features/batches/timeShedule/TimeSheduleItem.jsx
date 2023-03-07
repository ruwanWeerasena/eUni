import React, { useState } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const TimeSheduleItem = ({
  sheduleItem,
  setSelectedTimeShedule,
  setOperation,
}) => {
  const edit = (item) => {
    setOperation("edit");
    setSelectedTimeShedule(item);
  };

  const del = (item) => {
    setOperation("delete");
    setSelectedTimeShedule(item);
  };

  return (
    <Grid item xs={12} sx={{borderBottom:1, display:"flex", margin:1, paddingBottom:1}}>
      <Grid item xs={1}>
        <Typography>{sheduleItem.batchTimeSheduleId}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>{sheduleItem.day}</Typography>
      </Grid>
      <Grid item xs={3}>
      <Typography>{sheduleItem.startTime}</Typography>
      </Grid>
      <Grid item xs={3}>
      <Typography>{sheduleItem.endTime}</Typography>
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

export default TimeSheduleItem;
