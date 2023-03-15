import { CircularProgress,  Typography} from '@mui/material/'
import { useDispatch, useSelector } from "react-redux";
import { retrievePaymentsById } from "../../studentPaymentSlice";
import {  useEffect } from "react";
import { TableContainer,Table,TableHead,TableRow,TableCell,TableBody } from "@mui/material";

const PaymetHistory = ({studentId,setPaidAmount})=>{
  
    const dispatch = useDispatch()
    const paymentlist = useSelector((state)=>state.studentPayments.studentPaymentList);
    const paymentliststatus = useSelector((state)=>state.studentPayments.status);
    useEffect(()=>{
        dispatch(retrievePaymentsById(studentId))

    },[])

    useEffect(()=>{
        const amount = countAmount();
        setPaidAmount(amount)

    },[paymentlist])

    if(paymentliststatus.retrievingStatus=="loading"){
        return(
            <CircularProgress/>
        )
    }

 
    const countAmount = ()=>{
        var paidamount= 0;
        if(paymentlist){
            paymentlist.map((p)=>{
                paidamount+=p.amount
            })
        }
        return paidamount
    }



    return(
            <TableContainer >
            <Typography>History</Typography>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell >Amount</TableCell>
              <TableCell >Method</TableCell>
              <TableCell >Status</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
 
             {
             paymentlist.length==0?"No Past Payments" :
             
             paymentlist.map((row)=>{
                return(
                    <TableRow
                    key={row.batchPaymentSheduleId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell >
                      {row.paymentDate}
                    </TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>{row.paymentMethod}</TableCell>
                    <TableCell >{row.paymentStatus}</TableCell>
                  
                  </TableRow>
                )
            })}
          </TableBody>
        </Table>
      </TableContainer>
           
    );
}

export default PaymetHistory;