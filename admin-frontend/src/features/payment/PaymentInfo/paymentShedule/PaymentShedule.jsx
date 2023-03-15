import { useEffect,useState,useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {retrieveBatchPaymentShedules} from "../../../batches/paymentShedule/paymentShedultSlice"
import { CircularProgress, Typography } from "@mui/material";
import { TableContainer,Table,TableHead,TableRow,TableCell,TableBody } from "@mui/material";
import {PaymentContext} from "../../index"


const PaymentShedule = ({batchId,paidAmount,shedules,setShedules,setDueAmount,dueAmount})=>{
  
    const dispatch = useDispatch();
    const [discount , setDiscount] = useState(null)
    var paid = paidAmount;

    const {paymentData,setpaymentData} = useContext(PaymentContext);

    const paymentshedules = useSelector((state)=>state.batchPaymentShedules.paymentSheduleList)
    const paymentshedulesstatus = useSelector((state)=>state.batchPaymentShedules.status)

    useEffect(()=>{
        dispatch(retrieveBatchPaymentShedules())
    },[])

    useEffect(()=>{
        if(paymentshedules.length !=0){
            setShedules( paymentshedules.filter((s)=>s.batchId==batchId))
            setpaymentData({...paymentData,shedules:shedules});
        }
    },[paymentshedules])



    useEffect(()=>{
      if(paymentData.enrollment.batchDiscountId){

        setDiscount({
          discountType:paymentData.enrollment.batchDiscountType,
          criteria:paymentData.enrollment.batchDiscountCriteria,
          percentage:paymentData.enrollment.batchDiscountsPercentage,
          amount:paymentData.enrollment.batchDiscountsAmount,
          batchDiscountId:paymentData.enrollment.batchDiscountId
        });
      }

    },[paymentData.enrollment])


    if(paymentshedulesstatus==="loading"){
        return(
            <CircularProgress/>
        )
    }
    return(
        <TableContainer >
            <Typography>Shedule</Typography>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell >Date</TableCell>
              <TableCell >Amount</TableCell>
              {
                discount && (discount.discountType=="PERCENTAGE"?
                <TableCell >Discounted {discount.percentage}%</TableCell>:
                <TableCell >Discounted {discount.amount}</TableCell>)
              }
              <TableCell >due</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {
              shedules.length == 0 ?"No Shedules":
              
              shedules.map((row) => {
                let text = '';
                let discountedfee;
                var color="none"

                if(discount){
                  if(discount.discountType=="PERCENTAGE"){
                    let calculatediscount = (paymentData.enrollment.batchFee * discount.percentage)/100;
                    discountedfee = Math.round(row.amount -((row.amount/paymentData.enrollment.batchFee)*calculatediscount))
                  }else{
                    let calculatediscount = ( discount.amount);
                    discountedfee=Math.round(row.amount-((row.amount/paymentData.enrollment.batchFee)*calculatediscount));
                  }

                  if(paid>=discountedfee){
                    text="completed";
                    paid=paid-discountedfee
                    color="none"
                  }else if(paid<=discountedfee && paid !=0){
                    text=`due : ${discountedfee-paid}`;
                    paid=0;
                    color="red"
                    
                  }else{
                    text='Comming'
                    color="none"
                  }

                }else{
                  if(paid>=row.amount){
                    text="completed";
                    paid=paid-row.amount
                    color="none"
                  }else if(paid<=row.amount && paid !=0){
                    text=`due : ${row.amount-paid}`;
                    paid=0;
                    color="red"
                    
                  }else{
                    text='Comming'
                    color="none"
                  }

                }
                
                return(<TableRow
                  key={row.batchPaymentSheduleId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell >
                    {row.title}
                  </TableCell>
                  <TableCell>{row.paymentDate}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  {
                    discount && 
                    <TableCell>{discountedfee}</TableCell>
                  }

                  <TableCell sx={{color:color}}>{text}</TableCell>
                
                </TableRow>)
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );

}

export default PaymentShedule;