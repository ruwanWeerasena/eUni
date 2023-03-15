import { Button, Grid,TextField} from "@mui/material";
import * as yup from "yup";
import {useFormik} from "formik";
import FormHelperText from '@mui/material/FormHelperText';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useContext, useEffect, useState } from "react";
import {PaymentContext} from "../index"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from "react-redux";
import {createPayment} from "../studentPaymentSlice"
import {
  showInfo
} from "../../notifications/notificationSlice";
const PaymentForm = ({setValue})=>{
    const {paymentData} = useContext(PaymentContext);
    const [dueFee,setDueFee] = useState(0);
    const [outstandingFee,setOutstandingFee] = useState("");
    const dispatch = useDispatch();

    let paid = paymentData.paidAmount;

    const status = useSelector((state)=>state.studentPayments.status);
    const operation = useSelector((state)=>state.studentPayments.operation);

    const initialvalues =  {
        amount : "",
        paymentMethod:""
    }
    const validationSchema = yup.object({
      amount:yup.string().required("Required"),
      paymentMethod:yup.string().required("Required")
    });
    useEffect(()=>{
      calculatedueAndOutstanding()
    },[paymentData])

    useEffect(()=>{
      if(status.modifyingStatus=="succeeded"){
        if(operation =="inserting"){
          dispatch(
            showInfo({
              message: "Payment Successfull.",
              type: "info",
              autoClose: true,
              open: true,
              remainingTime: 3000,
            })
          );

          setValue(0);
        }
      }else if(status.modifyingStatus == "failed"){
        if(operation =="inserting"){
          dispatch(
            showInfo({
              message: "Payment Failed.",
              type: "info",
              autoClose: true,
              open: true,
              remainingTime: 3000,
            })
          );
        }
      }
    },[status])



    const calculatedueAndOutstanding = ()=>{
        let due=0;
        if(paymentData.enrollment.batchDiscountType){
          let discountedfee;
          let calculatediscount;
          if(paymentData.enrollment.batchDiscountType=="PERCENTAGE"){
             calculatediscount = (paymentData.enrollment.batchFee * paymentData.enrollment.batchDiscountsPercentage)/100;
          }else{
             calculatediscount = (paymentData.enrollment.batchDiscountsAmount);
          }
    
          paymentData.shedules.find((s)=>{
               
                discountedfee=Math.round(s.amount-((s.amount/paymentData.enrollment.batchFee)*calculatediscount));
                
                
                if(paid<discountedfee && paid !=0){
                  due=discountedfee-paid;
                  paid=0;
                  setDueFee(due)
                }else if(paid>=discountedfee){
                  paid=paid-discountedfee
                }
              return discountedfee > paymentData.paidAmount
          });
  
          setOutstandingFee(paymentData.enrollment.batchFee-calculatediscount - paymentData.paidAmount)
        }else{
          paymentData.shedules.find((s)=>{
            
            if(paid<=s.amount && paid !=0){
              due=s.amount-paid;
              paid=0;
              setDueFee(due)
            }else if(paid>=s.amount){
              paid=paid-s.amount
            }
          return s.amount > paymentData.paidAmount
          });
          setOutstandingFee(paymentData.enrollment.batchFee - paymentData.paidAmount)

        }
    }

    const formik = useFormik({
      initialValues:initialvalues,
      validationSchema: validationSchema,
      onSubmit: (values) => {
      
        const paymentObj = {
          amount :values.amount,
          outstanding:outstandingFee-values.amount,
          paymentMethod:values.paymentMethod,
          paymentConfirmationId:"null",
          paymentStatus:"active",
          studentId:paymentData.student.studentId,
          staffId:paymentData.enrollment.staffId,
          enrollmentId:paymentData.enrollment.enrollmentId
        }
        dispatch(createPayment(paymentObj))
      }
    });

    return (
      <Grid container spacing={2}>
       
        <Grid item xs={6}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="amount"
                name="amount"
                label="Amount"
                value={formik.values?.amount}
                onChange={formik.handleChange}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
              />
            </Grid>
            <Grid item xs={12}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="paymentMethod"
              value={formik.values?.paymentMethod}
              onChange={formik.handleChange}
              error={formik.touched.paymentMethod && Boolean(formik.errors.paymentMethod)}
              
            >
              <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
              <FormControlLabel value="Card" control={<Radio />} label="Card" />
            </RadioGroup>
            <FormHelperText sx={{color:"red"}}>{formik.touched.paymentMethod && formik.errors.paymentMethod}</FormHelperText>
            </Grid>
           
     
      
            <Grid item xs={12} >
              <Button color="primary" variant="contained" fullWidth type="submit">
                Pay
              </Button>
            </Grid>
          </Grid>
        </form>
        </Grid>
        <Grid item xs={6}>
                <Card sx={{ minWidth: 275 }}>
            <CardContent>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Due Amount
                </Typography>
                <Typography  variant="h5">
                   {dueFee}
                </Typography>
                
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Outstanding Amount
                </Typography>
                <Typography variant="h5" component="div">
                {outstandingFee}
                </Typography>
               
            </CardContent>
          
            </Card>
        </Grid>
        </Grid>
    )
}
export default PaymentForm