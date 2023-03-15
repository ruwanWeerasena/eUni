import {Button, CircularProgress, Grid, TextField, Typography} from '@mui/material/'
import { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {retrieveStudent} from "../../students/studentSlice"
import {retrieveBatchPaymentShedules} from "../../batches/paymentShedule/paymentShedultSlice"
import PaymentShedule from './paymentShedule/PaymentShedule';
import PaymentHistory from './PaymentHistory/PaymentHistory'
import PaymentDiscount from './PaymentDiscount';
import {PaymentContext} from "../index";



const PaymentInfo = ({batchId,enrollmentId,setValue})=>{
    const {paymentData , setpaymentData} = useContext(PaymentContext);

    const [paidAmount,setPaidAmount] = useState(0);
    const [shedules,setShedules] = useState([]);
    const [dueAmount,setDueAmount] = useState(0);

    useEffect(()=>{
      setpaymentData({...paymentData,paidAmount:paidAmount,shedules:shedules,dueAmount:dueAmount})
    },[paidAmount])
    const paymentshedulesstatus = useSelector((state)=>state.batchPaymentShedules.status)
  
  //   <Button fullWidth variant='outlined'
  //   onClick={()=>{
  //     setValue(2)
  //   }}
  // >Proceed</Button>

    return(
        <Grid container spacing={1}>
          <Grid item xs={12} >
              <PaymentDiscount paymentData={paymentData}/>
          </Grid>
          
            <Grid item xs={6}>
                  <PaymentShedule shedules={shedules} dueAmount={dueAmount} setDueAmount={setDueAmount} setShedules={setShedules} paidAmount={paidAmount} batchId={paymentData.enrollment.batchId}/>
                      {
                        paymentshedulesstatus!="loading"?
                      <>
                      <Button sx={{mr:2}}  variant='outlined'
                      onClick={()=>{
                        setValue(0)
                      }}
                    >Back</Button>
                      
                    <Button sx={{mr:2}}   variant='outlined'
                      onClick={()=>{
                        setValue(2)
                      }}
                    >Proceed</Button>
                    </>
                    :""

                  }
            </Grid>

            <Grid item xs={6}>
                <PaymentHistory setPaidAmount={setPaidAmount} studentId={paymentData.student.studentId}/>
            </Grid>

        </Grid>
            
    );
}

export default PaymentInfo;