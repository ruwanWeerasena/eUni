import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveStudent } from '../../students/studentSlice';
import { retrieveBatches } from '../../batches/batchesSlice';
import {Grid,InputLabel,MenuItem,FormControl,Select,Box,Button} from '@mui/material';






const EnrollmentBulk = ()=> {

    const dispatch = useDispatch();
    const [selectedStudents,setSelectedStudents] = useState([]);
    const [selectedBatch,setSelectedBatch] = useState(1);
    const columns = [
        { field: 'col1', headerName: 'studentId', width: 150 },
        { field: 'col2', headerName: 'Name', width: 150 },
        { field: 'col3', headerName: 'Mobile', width: 150 },
    ];
    
    useEffect(()=>{
        
        dispatch(retrieveStudent())
        
        dispatch(retrieveBatches())
    },[])
    
    const students = useSelector((state)=>state.students.studentlist);
    const batches = useSelector((state)=>state.batches.batchList);
    const rows = students.map(({studentId,name,mobile})=>{return{id:studentId,col1:studentId,col2:name,col3:mobile}})

    const enroll = ()=>{

        let date = new Date()
        const data = {
        //   installmentMethod :installmentMethod,
          enrollmentDate :date.getFullYear()+"-"+ (date.getMonth()<10?"0"+date.getMonth():date.getMonth())+"-" +(date.getDate()<10?"0"+date.getDate():date.getDate()) ,
          batchId :selectedBatch.batchId,
          staffId :selectedBatch.inchargeStaffId
          ,
          batchDiscountId : null,
        //   studentId :student.studentId
    
    
        }
        console.log(data)
      }
      

  return (
    <div >
        <Grid container spacing={2} >
            <Grid item xs={8} style={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={rows} 
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[students.length]}
                    checkboxSelection
                    onSelectionModelChange={(ids) => {
                        const selectedIDs = new Set(ids);
                        const selectedRowData = rows.filter((row) =>
                          selectedIDs.has(row.id)
                        );
                        setSelectedStudents(selectedRowData)
                      }}
                />
            </Grid>
            <Grid item xs={4} >
                <Grid item xs={12} sx={{pb:2}}>
                    <FormControl fullWidth>
                    <InputLabel id="BatchLabel"> Batches</InputLabel>
                        <Select
                        labelId="BatchLabel"
                        id="batchselect"
                        name="batchselect"
                        value={selectedBatch}
                        onChange={(e)=>{setSelectedBatch(e.target.value)}}
                        
                        >
                        {batches.map((batch) => (
                            <MenuItem key={batch.batchId} value={batch.batchId}>{batch.name}</MenuItem>
                            
                        ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} ></Grid>
                    <Button 
                      variant="contained"
                      fullWidth
                      onClick={()=>{enroll()}} >
                      Enroll
                    </Button>
              
                </Grid>

        </Grid>
      
    </div>
  );
}

export default EnrollmentBulk;