import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Grid, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createStaff, updateStaff } from "../staffSlice";

const validationSchema = yup.object({});

// email: yup
// .string("Enter your email")
// .email("Enter a valid email")
// .required("Email is required"),
// password: yup
// .string("Enter your password")
// .min(8, "Password should be of minimum 8 characters length")
// .required("Password is required"),

const StaffForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectStaffById = (staffs, id) => {
    if (id != "null") {
      return staffs.find((staff) => staff.staffId == id);
    } else {
      return {
        id: null,
        name: "",
        address: "",
        dateOfBirth: "",
        email: "",
        mobile: "",
      };
    }
  };

  const staff = useSelector((state) => selectStaffById(state.staffs, id));

  const formik = useFormik({
    initialValues: staff,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("values", values.staffId);
      if (values.staffId) {
        dispatch(updateStaff({ id: values.staffId, data: values }));
      } else {
        dispatch(createStaff(values));
      }

      navigate("/staffs");
    },
  });

  //console.log('formik', formik)

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
                error={
                  formik.touched.dateOfBirth &&
                  Boolean(formik.errors.dateOfBirth)
                }
                helperText={
                  formik.touched.dateOfBirth && formik.errors.dateOfBirth
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values?.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
              />
            </Grid>
          </Grid>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default StaffForm;
