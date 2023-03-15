import {  Grid,  Typography} from '@mui/material/';



const PaymentDiscount = ({paymentData})=>{



    return(
        <Grid item xs={12} >
            {

                paymentData.enrollment.batchDiscountId &&
                <Typography>Discount Criteria - {paymentData.enrollment.batchDiscountCriteria}<br/>{paymentData.enrollment.batchDiscountType} - {paymentData.enrollment.batchDiscountType=="PERCENTAGE"?paymentData.enrollment.batchDiscountsPercentage:paymentData.enrollment.batchDiscountsAmount}</Typography>
            }
         
        </Grid>
    );
}

export default PaymentDiscount;