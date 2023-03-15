import {Grid,Typography,Button} from "@mui/material"
import { useContext } from "react";
import {PaymentContext} from "../index";

const EnrollmentSet = ({enrollments,setValue})=>{

    const {paymentData,setpaymentData} = useContext(PaymentContext)

    return (
        enrollments.map((e)=>{
            return(
                <Grid item xs={12} sx={{borderBottom:1, display:"flex", margin:1, paddingBottom:1}} key={e.enrollmentId}>
                <Grid item xs={3}>
                    <Typography>{e.batchName}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography>{e.installmentMethod}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography>{e.enrollmentDate}</Typography>
                </Grid>
                <Grid item xs={3}>

                    <Typography>{e.staffName}</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="outlined"
                    onClick={()=>{
                        setpaymentData({...paymentData,enrollment:e})
                        setValue(1)
                    }}
                    >
                         Pay
                    </Button>
                </Grid>
                </Grid>
            )
        })
        
    );
    
}

export default EnrollmentSet;