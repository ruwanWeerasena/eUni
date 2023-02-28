import React, { useEffect, useState } from "react";
import { Button, Grid, Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { retrieveBatchByCourse } from "../../batches/batchesSlice";
import { retrieveCourses } from "../../courses/courseSlice";
import { retrieveStudent } from "../../students/studentSlice";
import  createEnrollment from "../enrollmentSlice"




const EnrollmentForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [availBatches,setAvailBatches] = useState(true)
  const [selectedBatch,setSelectedBatch] = useState(null)
  const [selectedCourse,setSelectedCourse] = useState()
  const [student,setStudent] = useState(null)
  const [studentMobile,setStudentMobile] = useState()
  const [installmentMethod , setInstallmentMethod] = useState();

  useEffect(() => {
    // dispatch(retrieveBranches());
    dispatch(retrieveStudent());
    dispatch(retrieveCourses());
   
  }, []);

  const courses = useSelector((state)=>state.courses?.entities);
  const batches = useSelector((state) => state.batches.batchList);
  const students = useSelector((state)=>state.students.studentlist)

  const installmentOptions = ['Cash','Card'];


  const getAvailBatches = (CourseId)=>{
    dispatch(retrieveBatchByCourse({id:CourseId}));
    setAvailBatches(false)
  }

  const getStudent = ()=>{
  
    students.forEach(element => {
      if (element.mobile == studentMobile){
        setStudent(element)
      }
    });
    
  }


  const enroll = ()=>{

    let date = new Date()
    const data = {
      installmentMethod :installmentMethod,
      enrollmentDate :date.getFullYear()+"-"+ (date.getMonth()<10?"0"+date.getMonth():date.getMonth())+"-" +(date.getDate()<10?"0"+date.getDate():date.getDate()) ,
      batchId :selectedBatch.batchId,
      staffId :selectedBatch.inchargeStaffId
      ,
      batchDiscountId : null,
      studentId :student.studentId,
      staff :{},
      batch :{},
      student : {},
      batchDiscount :{}

    }
    console.log(data)
   
    dispatch( createEnrollment(data))
  }
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <form >
          <Grid container spacing={2}>
            <Grid item xs={4} >
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="studentMobile"
                  label="Student Mobile"
                 
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
                  {/* {student.length && student[0].name} */}
                  {student && student.name}

                </Box>
              </Grid>
            </Grid>
            <Grid item xs={8}>
            {student &&    
             <>
             <Grid item xs={12} sx={{pb:1}}>
             <FormControl fullWidth>
             <InputLabel id="CourseLabel">Course</InputLabel>
                 <Select
                   id="courseSelect"
                   value={selectedCourse}
                   label="Courses"
                   onChange={(e)=>{
                    getAvailBatches(e.target.value)
                    setSelectedCourse(e.target.value)
                  }}
                 >
                   {Object.keys(courses).map((id) => (
                     <MenuItem key={courses[id].id} value={courses[id].id}>{courses[id].name}</MenuItem>
                   ))}
                 </Select>
               </FormControl>
             </Grid>

            <Grid  item xs={12} sx={{pb:1}}>
            <FormControl fullWidth>
            <InputLabel id="BatchLabel">Available Batches</InputLabel>
                <Select
                  id="batchselect"
                  disabled={availBatches}
                  onChange={(e)=>{
                    setSelectedBatch(e.target.value)
                  }}
                  
                >
                  {batches.map((batch) => (
                    <MenuItem key={batch.batchId} value={batch}>{batch.name}</MenuItem>
                    
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid  item xs={12} sx={{pb:1}}>
            <FormControl fullWidth>
            <InputLabel id="installmentM">Installment Method</InputLabel>
                <Select
                  id="installmentMethod"
                  value={installmentMethod}
                  onChange={(e)=>{
                    setInstallmentMethod(e.target.value)
                    console.log(e.target)
                  }}
                  
                >
                    <MenuItem  value={installmentOptions[0]}>{installmentOptions[0]}</MenuItem>
                    <MenuItem  value={installmentOptions[1]}>{installmentOptions[1]}</MenuItem>
                    
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Box >
                  <Button 
                      variant="contained"
                      fullWidth
                      onClick={()=>{enroll()}} >
                      Enroll
                  </Button>
                </Box>
            </Grid>
             </>
             }
            </Grid>
             
            
            
            
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default EnrollmentForm;
