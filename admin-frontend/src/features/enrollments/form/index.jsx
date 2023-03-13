import React, { useEffect, useState } from "react";
import { Button, Grid, Box ,CircularProgress } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {  retrieveBatches } from "../../batches/batchesSlice";
import { retrieveCourses } from "../../courses/courseSlice";
import { retrieveStudent } from "../../students/studentSlice";
import  {createEnrollment} from "../enrollmentSlice"
import * as yup from "yup";
import {Formik , Field ,Form} from "formik";
import SelectBatch from "./SelectBatch";
import {
  showInfo, showError
} from "../../../features/notifications/notificationSlice";



const EnrollmentForm = () => {
  const validationSchema = yup.object({

    course: yup.string().required("course is required"),
    batch: yup.string().required("batch is required"),
    installmentMethod: yup.string().required("installmentMethod is required"),
  
  
  });

  const [studentMobile,setStudentMobile] = useState("0677678721");
  const [student,setStudent] = useState(null)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const courses = useSelector((state)=>state.courses?.entities);
  const students = useSelector((state)=>state.students.studentlist);
  const batches = useSelector((state)=>state.batches?.batchList);

  const status = useSelector((state) => state.enrollments?.status);
  const operation = useSelector((state) => state.enrollments?.operation);

  useEffect(()=>{

    dispatch(retrieveCourses());
    dispatch(retrieveStudent());
    dispatch(retrieveBatches())
  },[])
  
  useEffect(() => {
    if (status.modifyingStatus === "succeeded") {
      if (operation === "inserting") {

        dispatch(
          showInfo({
            message: "Enrollment has been successfully created."
          })
        );
      } else if (operation === "updating") {
        dispatch(
          showInfo({
            message: "Enrollment has been successfully updated."
          })
        );
      }

      navigate("/enrollment/view");
    }

    if (status.modifyingStatus === "failed") {
      if (operation === "inserting") {
        dispatch(
          showError({
            message: "Enrollment creation failed"
          })
        );
      } else if (operation === "updating") {
        dispatch(
          showError({
            message: "Enrollment updation failed"
          })
        );
      }
    }
  }, [status, operation]);
  const installmentOptions = ['Cash','Card'];
  const getStudent = ()=>{

      students.forEach(element => {
        if (element.mobile == studentMobile){
          setStudent(element)
          
        }
      });
      
    }

  const getBatch = (batch)=>{
    const b = batches.filter((itm)=>itm.batchId===batch);
    return b[0];
  }
  const initialValues = {
    course : '',
    batch :'',
    installmentMethod:''
  }
  const enroll = ({course,batch,installmentMethod})=>{

    let date = new Date()
    const data = {
      installmentMethod :installmentMethod,
      enrollmentDate :date.getFullYear()+"-"+ (date.getMonth()<10?"0"+date.getMonth():date.getMonth())+"-" +(date.getDate()<10?"0"+date.getDate():date.getDate()) ,
      batchId :batch,
      staffId :getBatch(batch).inchargeStaffId,
      batchDiscountId : null,
      studentId :student.studentId,


    }
    dispatch( createEnrollment(data))
    // navigate("../enrollment/view")
  }
  // const courseloadingStatus = useSelector((state) => state.courses?.status);
  // const batchloadingStatus = useSelector((state) => state.batches?.status);
  // const studentloadingStatus = useSelector((state) => state.students?.status);
  // if(courseloadingStatus=="loading" || batchloadingStatus=="loading" || studentloadingStatus=="loading"){
  //   return  <CircularProgress />
  // }
 
  return (
   
    <Grid container spacing={2}>
    <Grid item xs={4} >
        <Grid item xs={12}>
        <TextField
          fullWidth
          id="studentMobile"
          label="Student Mobile"
          value={studentMobile}
          onChange={(e)=>{
            
            setStudentMobile(e.target.value)
          }}
        />
        </Grid>
        <Grid item xs={12}>
         <Box>
           <Button onClick={()=>{getStudent()}} >
               Search Student
           </Button>
         </Box>
       </Grid>
       <Grid item xs={12}>
         <Box>
           {student && student.name}

         </Box>
       </Grid>
    </Grid>
    {
        student &&
        <Formik
        initialValues={initialValues}
        validationSchema= {validationSchema}
        onSubmit={ (values) => {enroll(values);}}
      >
        <Grid item xs={8}>
        <Form>
            <Grid item xs={12} sx={{pb:1}}>
                <FormControl fullWidth>
                <InputLabel id="CourseLabel">Course</InputLabel>
                <Field  name="course" >
                   
                    {
                        ({field})=>{
                            return <Select  {...field}   helpertext={"ff"}>
                                 {Object.keys(courses).map((id) => (
                                        <MenuItem key={courses[id].id} value={courses[id].id}>{courses[id].name}</MenuItem>
                    ))}
                            </Select>
                        }
                    }
                 
                </Field>
                </FormControl>
            </Grid>
            <Grid  item xs={12} sx={{pb:1}}>
                <FormControl fullWidth>
                    <SelectBatch name="batch"/>
                </FormControl> 
            </Grid>
            
            <Grid  item xs={12} sx={{pb:1}}>
                <FormControl fullWidth>
                <InputLabel id="installmentM">Installment Method</InputLabel>
                <Field  name="installmentMethod" >
                  {
                    ({field})=>{
                      return <Select {...field}>
                        <MenuItem  value={installmentOptions[0]}>{installmentOptions[0]}</MenuItem>
                        <MenuItem  value={installmentOptions[1]}>{installmentOptions[1]}</MenuItem>
                      </Select>
                    }
                  }

                
                </Field>
                </FormControl> 
            </Grid>
            <Grid  item xs={12} sx={{pb:1}}>
                <Box >
                    <Button 
                        variant="contained"
                        fullWidth
                        type="submit" >
                        Enroll
                    </Button>
                </Box>
            </Grid>

        </Form>   
        </Grid>    
        </Formik> 
    }
    
   
</Grid>
  );
};

export default EnrollmentForm;
