import { Grid } from "@mui/material";
import React, { useState, createContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";


import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import StudentEnrollmetInfo from "./EnrollmentInfo";
import PaymentInfo from "./PaymentInfo";
import PaymentForm from "./PaymentTab";

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

const PaymentContext = createContext()
const PaymentManagement = () => {
  const { id } = useParams();
  const [paymentData,setpaymentData] = useState({
    student:null,
    enrollment : null,
    paidAmount : null,
    paymentMethod:null,
    shedules:null

  })

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue,"ddddd");
  };



  return (
    <PaymentContext.Provider value={{ paymentData, setpaymentData }}>
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label= "Enrollment Details" {...a11yProps(0)} />
          <Tab label="Payment Info"  {...a11yProps(1)} />
          <Tab label="Payment"  {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <StudentEnrollmetInfo setValue={setValue}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {
          paymentData.student? 
          <PaymentInfo setValue={setValue} />:"No data"
        }
        
          
      </TabPanel>
      <TabPanel value={value} index={2}>
      {
          paymentData.shedules? 
          <PaymentForm setValue={setValue}/>:"No data"
        }
        
          
      </TabPanel>
  
      
    </Box>
    </PaymentContext.Provider>
  );
};

export default PaymentManagement;
export { PaymentContext };
