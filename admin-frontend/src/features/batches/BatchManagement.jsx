import { Grid } from "@mui/material";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BatchForm from "./form";
import PaymentShedule from "./paymentShedule";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TimeShedule from "./timeShedule";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BatchManagement = () => {
  const { id } = useParams();
  const [batchId, setBatchId] = useState();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Batch Details" {...a11yProps(0)} />
          <Tab label="Payment Shedule" {...a11yProps(1)} />
          <Tab label="Time Shedule" {...a11yProps(2)} />
          <Tab label="Discount Options" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <BatchForm id={id} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {id != "null" && <PaymentShedule batchId={id} />}
      </TabPanel>
      <TabPanel value={value} index={2}>
      {id != "null" && <TimeShedule batchId={id} />}
      </TabPanel>
      <TabPanel value={value} index={3}>
        Discount Options
      </TabPanel>
    </Box>
  );
};

export default BatchManagement;
