

import {
  Button,
 
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const EnrollmentOption = ()=>{

  const navigate = useNavigate();

  return (
    <Grid container>
        <Grid item xs={4} >
          <Button variant="contained" sx={{height:100}} onClick={()=>{navigate('./new')}}>
            Enroll Student
          </Button>
        </Grid>
        <Grid item xs={4} >
          <Button variant="contained" sx={{height:100}} onClick={()=>{navigate('./bulk')}}>
            Transfer Students
          </Button>
        </Grid>
        <Grid item xs={4} >
          <Button variant="contained" sx={{height:100}} onClick={()=>{navigate('./view')}}>
             All Enrollments
          </Button>
        </Grid>
    </Grid>
   
  );
}

export default EnrollmentOption;
