import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Grid, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createLecturer, updateLecturer } from "../lecturerSlice";

const validationSchema = yup.object({
  name: yup.string().min(3,"Enter a valid Name").required("Name is required"),
  address: yup.string().min(5,"Enter a valid address").required("Address is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  dateOfBirth: yup.string().required("Date Of Birth is required"),
  mobile: yup.string().matches(/^[0][0-9]{9}$/,"Mobile format - 0xxxxxxxxx ").required(" Mobile number is required"),

});




const LecturerForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const selectlecturebyid = (lecturers, id) => {
      
        
    if (id != "null") {
      return lecturers.find((lecturer) => lecturer.lecturerId == id);
    } else {
      return {
        id: null,
        name: "",
        address: "",
        dateOfBirth: "",
        mobile: "",
        email: "",
      };
    }
  };

  const lecturer = useSelector((state) => selectlecturebyid(state.lecturers.lecturerList, id));

  const formik = useFormik({
    initialValues: lecturer,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      
      if (values.lecturerId) {
        dispatch(updateLecturer({ id: values.lecturerId, data: values }));
      } else {
        dispatch(createLecturer(values));
      }

      navigate("/lecturers");
    },
  });


  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={formik.values?.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="address"
                name="address"
                label="Address"
                value={formik.values?.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="dateOfBirth"
                name="dateOfBirth"
                label="Date Of Birth"
                value={formik.values?.dateOfBirth}
                onChange={formik.handleChange}
                error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="mobile"
                name="mobile"
                label="Mobile"
                value={formik.values?.mobile}
                onChange={formik.handleChange}
                error={
                  formik.touched.mobile &&
                  Boolean(formik.errors.mobile)
                }
                helperText={
                  formik.touched.mobile && formik.errors.mobile
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="E Mail"
                value={formik.values?.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} >
              <Button color="primary" variant="contained" fullWidth type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default LecturerForm;
