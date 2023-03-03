import {useField, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { retrieveBatches } from "../../batches/batchesSlice";
import { useSelector, useDispatch } from "react-redux";
import Select from "@mui/material/Select";
import {MenuItem,InputLabel} from "@mui/material";

const SelectBatch = (props) => {
    const dispatch = useDispatch();
    const [batchlist,setBatchlist] =  useState()
    const batches = useSelector((state) => state.batches.batchList);
    const {
      values: { course },
      
    } = useFormikContext();
    
    const [field] = useField(props);
    useEffect(()=>{
      dispatch(retrieveBatches());
    },[])
    useEffect(() => {
    

      if (course !== "") {
        filterBatch();
       
      
      }
   
    }, [course]);

    const filterBatch = ()=>{
    
      if(batches.length>0){
        const newlist = batches.filter((batch)=>batch.courseId==course)
        setBatchlist(newlist)
      }
    }
    return (
  
     batchlist &&
     <>
        <InputLabel id="installmentM">Installment Method</InputLabel>
        <Select {...props} {...field} >
          {
            batchlist && batchlist.map((batch)=>{
              return <MenuItem key={batch.batchId} value={batch.batchId}>{batch.name}</MenuItem>
            })
          }
        </Select>
    </>
    );
  };

  export default SelectBatch;