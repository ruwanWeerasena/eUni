import TimeSheduleManager from "./TimeSheduleManager";
import TimeSheduleGrid from "./TimeSheduleGrid";
import { Grid } from "@mui/material";
import { useState } from "react";
import { Box } from "@mui/system";

const TimeShedule = ({ batchId }) => {
  const [selectedTimeShedule, setSelectedTimeShedule] = useState({
    day: "Sunday",
    startTime: "",
    endTime: "",
  });
  const [operation, setOperation] = useState("add");

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box mb={5} mt={2}>
          <TimeSheduleManager
            batchId={batchId}
            setSelectedTimeShedule={setSelectedTimeShedule}
            timeShedule={selectedTimeShedule}
            operation={operation}
            setOperation={setOperation}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <TimeSheduleGrid
          batchId={batchId}
          setOperation={setOperation}
          setSelectedTimeShedule={setSelectedTimeShedule}
        />
      </Grid>
    </Grid>
  );
};

export default TimeShedule;
