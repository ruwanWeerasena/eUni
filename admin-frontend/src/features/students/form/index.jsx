import  { useEffect, useState } from "react";
import { Button, Grid, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {  createStudent, updateStudent } from "../studentSlice";





const StudentForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const initialstate = {
    id: null,
    name: "",
    dateOfBirth: "",
    street: "",
    city: "",
    state: "",
    email: "",
    mobile: "",
  }
  
  const [data,setData] = useState(initialstate);

  const selectStudentByID = (students, id) => {
    if (id != "null") {
      return students.find((student) => student.studentId == id);
    } else {
      return {
        initialstate
      };
    }
  };

  
  const student = useSelector((state) => selectStudentByID(state.students.studentlist, id));
  useEffect(()=>{
    if(student.studentId){
      setData(student);
    }
  },[])

 

  const handlesubmit = ()=>{
    if (data.studentId) {
      dispatch(updateStudent({ id: data.studentId, data:{...data,enrollments:[],studentPayments:[]} }));
    } else {
      dispatch(createStudent(data));
    }

    navigate("/students");
  }


  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
       
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={data?.name }
                onChange={(e)=>{
                  setData({...data,name:e.target.value})
                  
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="dateOfBirth"
                name="dateOfBirth"
                label="Date Of Birth"
                value={data?.dateOfBirth }
                onChange={(e)=>{setData({...data,dateOfBirth:e.target.value})}}
              />
            </Grid>
           
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="street"
                name="street"
                label="street"
                value={data?.street }
                onChange={(e)=>{setData({...data,street:e.target.value})}}
              />
            </Grid>
           
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="city"
                name="city"
                label="city"
                value={data?.city }
                onChange={(e)=>{setData({...data,city:e.target.value})}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="state"
                name="state"
                label="state"
                value={data?.state }
                onChange={(e)=>{setData({...data,state:e.target.value})}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                label="email"
                value={data?.email }
                onChange={(e)=>{setData({...data,email:e.target.value})}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="mobile"
                name="mobile"
                label="Mobile"
                value={data?.mobile }
                onChange={(e)=>{setData({...data,mobile:e.target.value})}}
              />
            </Grid>
            <Grid item xs={12}>
            <Button color="primary" variant="contained" fullWidth type="submit" onClick={handlesubmit}>
                 Submit
            </Button>
            </Grid>
          </Grid>
          
          
      
      </Box>
    </div>
  );
};

export default StudentForm;
