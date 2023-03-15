import {Button, CircularProgress, Grid, TextField, Typography} from '@mui/material/'
import { useEffect, useState ,useContext} from 'react';
import { useSelector, useDispatch } from "react-redux";
import {retrieveStudent} from "../../students/studentSlice"
import {retrieveEnrollments} from "../../enrollments/enrollmentSlice"
import EnrollmentSet from './EnrollmentSet';
import { PaymentContext } from "../index";


const StudentEnrollmetInfo = ({setValue})=>{
  const { paymentData,setpaymentData } = useContext(PaymentContext)
    const dispatch = useDispatch()
    const [studentMobile , setStudentMobile] = useState("0777675622");
    const [ student ,setStudent] = useState(undefined);
    const [enrollments , setEnrollments]= useState(null);

    const students = useSelector((state)=>state.students.studentlist)
    const studentStatus = useSelector((state)=>state.students.status)
    const enrollmentslist = useSelector((state)=>state.enrollments.enrollmentList)
    const enrollmentStatus = useSelector((state)=>state.enrollments.status)

    useEffect(()=>{
        dispatch(retrieveStudent())

        dispatch(retrieveEnrollments());

    },[])

    useEffect(()=>{
      if(student){

        const list = enrollmentslist.filter(e=>e.studentId==student.studentId);
        setEnrollments(list);
        setpaymentData({...paymentData,student:student})
      }
    },[student])
    
    if(studentStatus.retrievingStatus == "loading"){
      return(

        <CircularProgress/>
      )
    }
    if(enrollmentStatus.retrievingStatus == "loading"){
      return(

        <CircularProgress/>
      )
    }
    
    
    const search = ()=>{
        setStudent(students.find(e=>e.mobile==studentMobile))
       
    }
      
    
    return(
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField fullWidth
                  label="Student Phone"
                  value={studentMobile}
                  onChange={(e)=>{setStudentMobile(e.target.value)}}
                  />
                  
          </Grid>
          <Grid item xs={12}>
            <Button sx={{width:1}} variant='outlined' onClick={search}>Search</Button>
          </Grid>
          <Grid item xs={12} >
          {student &&  
              <>
                <Grid item xs={12}>
                    <Typography>Student Name :{student.name}</Typography>
                    <Typography>Student Email :{student.email}</Typography>
                </Grid>
                {
                  enrollments !=null ? 
                 ( <Grid>
                      <EnrollmentSet setValue={setValue} enrollments={enrollments}/>
                  </Grid>) : "No data"
                }
            
                
              </> 
            }
        </Grid>
        </Grid>
            
    );
}

export default StudentEnrollmetInfo;