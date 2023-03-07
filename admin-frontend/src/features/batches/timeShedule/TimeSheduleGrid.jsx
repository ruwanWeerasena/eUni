import React, { useEffect, useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import TimeSheduleItem from "./TimeSheduleItem";

import { useSelector, useDispatch } from "react-redux";
import { retrieveBatchTimeShedules } from "./timeSheduleSlice";

const TimeSheduleGrid = ({ batchId, setOperation, setSelectedTimeShedule }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveBatchTimeShedules());
  }, [batchId]);

  const shedules = useSelector(
    (state) => state.batchTimeShedules?.timeSheduleList
  );

  console.log("shedules", shedules);

  return (
    <Grid container>
      {shedules?.map((shedule) => (
        <TimeSheduleItem
          key={shedule.batchTimeSheduleId}
          sheduleItem={shedule}
          setSelectedTimeShedule={setSelectedTimeShedule}
          setOperation={setOperation}
        />
      ))}
    </Grid>
  );
};

export default TimeSheduleGrid;
