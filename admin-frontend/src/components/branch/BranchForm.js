import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import axios from 'axios';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';


import * as yup from 'yup';
import { useFormik} from "formik";

const BranchForm = ()=>{

    const formik = useFormik({
        initialValues:{
            name:"",
            address:"",
            email:"",
            contactperson:"",
            contactnumber:"",
            batches:[]
        },
    
   

        validationSchema:yup.object({
            name:yup.string().max(16,"must be 16 char or less").required("required"),
            address:yup.string().required("required"),
            email:yup.string().email("invalid email").required("required"),
            contactperson:yup.string().required("required"),
            contactnumber:yup.string().required("required"),
        }),
    
        onSubmit: async(values)=>{
            const {data:{result}} =  await axios.post("http://127.0.0.1:5000/branch",values,{
                headers:{'Content-Type':"application/json"}
            })
          
        },
        
    });
   


    return(
    <Grid container spacing={2} sx={{mt:2}}>
        <Grid item xs={2}>
            <Breadcrumbs sx={{ml:3}} aria-label="breadcrumb">
            
            <Link
                underline="hover"
                color="inherit"
                href="/"
            >
                Home
            </Link>
            <Typography color="text.primary">BranchForm</Typography>
            </Breadcrumbs>
        </Grid>
        <Grid item xs={8}>
            <form onSubmit={formik.handleSubmit}>
                <Grid item xs={12} sx={{m:2}}>
                    <Typography variant="h4" sx={{color:"GrayText"}} gutterBottom>
                        Branch Form
                    </Typography>
                </Grid>
                
                <Grid item xs={12} sx={{m:2}}>
                    <TextField value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} id="name"  label="Branch Name"  variant="outlined" sx={{width:"50%"}}  />
                    {formik.touched.name && formik.errors.name?<Typography variant="subtitle2" color={'red'} gutterBottom>*{formik.errors.name}</Typography>:null}
                </Grid>
                <Grid item xs={12} sx={{m:2}}>
                    <TextField value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} id="address" label="Branch Address" variant="outlined" sx={{width:"50%"}} />
                    {formik.touched.address && formik.errors.address?<Typography variant="subtitle2" color={'red'} gutterBottom>*{formik.errors.address}</Typography>:null}
                </Grid>
                <Grid item xs={12} sx={{m:2}}>
                    <TextField value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" label="email" variant="outlined" sx={{width:"50%"}} />
                    {formik.touched.email && formik.errors.email?<Typography variant="subtitle2" color={'red'} gutterBottom>*{formik.errors.email}</Typography>:null}
                </Grid>
                <Grid item xs={12} sx={{m:2}}>
                    <TextField value={formik.values.contactperson} onChange={formik.handleChange} onBlur={formik.handleBlur}  id="contactperson" label="Contact Person" variant="outlined" sx={{width:"50%"}} />
                    {formik.touched.contactperson && formik.errors.contactperson?<Typography variant="subtitle2" color={'red'} gutterBottom>*{formik.errors.contactperson}</Typography>:null}
                </Grid>
                <Grid item xs={12} sx={{m:2}}>
                    <TextField value={formik.values.contactnumber} onChange={formik.handleChange} onBlur={formik.handleBlur}  id="contactnumber" label="Contact Number" variant="outlined" sx={{width:"50%"}} />
                    {formik.touched.contactnumber && formik.errors.contactnumber?<Typography variant="subtitle2" color={'red'} gutterBottom>*{formik.errors.contactnumber}</Typography>:null}
                </Grid>
             
                <Grid  item xs={12} sx={{m:2}}>
                        <Button variant='contained' type='submit' sx={{m:2,width:'50%'}} >
                            Add Branch
                        </Button>
                </Grid>
            </form>
        </Grid>
        <Grid item xs={2}>

        </Grid>
       
       
    </Grid>
    );
}

export default BranchForm;