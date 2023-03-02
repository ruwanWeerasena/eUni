import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveStudent } from '../../students/studentSlice';
import { retrieveBatches } from '../../batches/batchesSlice';
import { retrieveEnrollments,createEnrollmentBulk } from '../../enrollments/enrollmentSlice';
import {Grid,InputLabel,MenuItem,FormControl,Select,Button} from '@mui/material';
import * as yup from "yup";
import {Formik ,Field ,Form} from "formik";
import MyDataGrid from './MyDataGrid';
import {useNavigate} from 'react-router-dom'

const Test=()=> {
 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedStudents,setSelectedStudents] = useState([]);
    const [currentBatch,setCurrentBatch] = useState('');
    const [dataGridData , setDataGridData] = useState(null)
    
    const columns = [
        { field: 'studentId', headerName: 'studentId', width: 150 },
        { field: 'studentName', headerName: 'Name', width: 150 },
        { field: 'mobile', headerName: 'Mobile', width: 150 },
        {
            field: "dicountId",
            headerName :'Discount',
            editable: true,
            type: "singleSelect",
            // { value: 'Spain', label: 'Spain' }, { value: 'Brazil', label: 'Brazil' }
            valueOptions: ['null','null']
        },
        {
            field: "installmentMethod",
            headerName :'installmentMethod',
            editable: true,
            type: "singleSelect",
            valueOptions: ['Cash','Card']
            
        }
    ];
    
    useEffect(()=>{
        
        dispatch(retrieveStudent())
        dispatch(retrieveEnrollments())
        dispatch(retrieveBatches())
    },[])

    useEffect(()=>{
        
    },[])
    
    const students = useSelector((state)=>state.students.studentlist);
    const batches = useSelector((state)=>state.batches.batchList);
    const enrollments = useSelector((state)=>state.enrollments.enrollmentList);


    const transfer = ({targetBatch})=>{
        let date = new Date()
        const data = {
        //   installmentMethod :installmentMethod,
          enrollmentDate :date.getFullYear()+"-"+ (date.getMonth()<10?"0"+date.getMonth():date.getMonth())+"-" +(date.getDate()<10?"0"+date.getDate():date.getDate()) ,
          batchId :targetBatch
         
      
    
        }
        const enrollmentlist = selectedStudents.map(({studentId,staffId,batchDiscountId,installmentMethod})=>{
            return{studentId,staffId,batchDiscountId,installmentMethod,...data}
        })
        console.log('enrollmentlist',enrollmentlist);
        dispatch(createEnrollmentBulk(enrollmentlist));
        navigate("../enrollment/view")
      }
      const getStudentList = ()=>{
        if(  students && enrollments){
            const relavantenrollmentlist = enrollments.filter((e)=>e.batchId == currentBatch);
            
 

            const res2 = relavantenrollmentlist.map((e)=>{
                const student = students.find((element)=> element.studentId==e.studentId)
                return {...e,studentName:student.name,mobile:student.mobile}
            })
            
             return res2;
        }
      }
      
      useEffect(()=>{
        const studentlist = getStudentList();
        
        const datalist = studentlist.map(({studentId,studentName,mobile,installmentMethod,...rest})=>{return{id:studentId,studentId:studentId,studentName:studentName,mobile:mobile,dicountId:'null',installmentMethod:installmentMethod,...rest}})
        setDataGridData(datalist)
       
      },[currentBatch])

      const initialValues = {
        CurrentBatch:'',
        targetBatch:''
      }
      
  return (

    <Formik
    initialValues={initialValues}
    onSubmit={ (values) => {
 
        transfer(values);
    }}
    >
    <Form>
    <Grid container spacing={2} >
            <Grid item xs={8} >
                <Grid item xs={12} sx={{pb:1}}>
                    <FormControl fullWidth>
                    <InputLabel id="CurrentbatchLabel">Current Batch</InputLabel>
                    <Field  name="CurrentBatch" >
                    
                        {
                            ({field})=>{
                                return <Select  {...field} value={currentBatch} onChange={(e)=>{setCurrentBatch(e.target.value)}} >
                                    {batches.map((batch) => (
                                <MenuItem key={batch.batchId} value={batch.batchId}>{batch.name}</MenuItem>
                                
                            ))}
                                </Select>
                            }
                        }
                    
                    </Field>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sx={{pb:2, height: 400,width: '100%'}}>
                    {
                            dataGridData &&
                            (
                                <FormControl fullWidth>
                                <Field  name="dataGrid" >
                                    {
                                        ({field})=>{
                                            
                                            return <MyDataGrid
                                                rows={dataGridData} 
                                                columns={columns} 
                                                rowsPerPageOptions={[students.length]} 
                                                setSelectedStudents={setSelectedStudents}
                                                setDataGridData={setDataGridData}
                                                getStudentList={getStudentList}
                                                setCurrentBatch={setCurrentBatch}
                                                />
                                        }
                                    }
                                </Field>
                                </FormControl>
                            )
                        }
                </Grid>
            </Grid>
            <Grid item xs={1}>
                 To
            </Grid>
            <Grid item xs={3} >
                
                <Grid item xs={12} sx={{pb:1}}>
                <FormControl fullWidth>
                <InputLabel id="BatchLabel2">Target Batch</InputLabel>
                <Field  name="targetBatch" >
                   
                    {
                        ({field})=>{
                            return <Select  {...field}   helpertext={"ff"}>
                                {batches.map((batch) => (
                                        <MenuItem key={batch.batchId} value={batch.batchId}>{batch.name}</MenuItem>
                                ))}
                            </Select>
                        }
                    }
                 
                </Field>
                </FormControl>
                </Grid>
                <Grid item xs={12} >
                    <Button 
                      variant="contained"
                      fullWidth
                      type='submit'
                     >
                      Transfer
                    </Button>
                </Grid>
            </Grid>
                

    </Grid>
</Form>
</Formik>
           
  )
}

export default Test