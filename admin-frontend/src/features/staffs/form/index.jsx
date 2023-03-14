import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Grid, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createStaff, updateStaff } from "../staffSlice";

import { showInfo, showError } from "../../../features/notifications/notificationSlice";

const validationSchema = yup.object({});

// const validationSchema = yup.object({
//   name: yup.string().min(3, "Enter a valid Name").required("Name is required"),
//   address: yup
//     .string()
//     .min(5, "Enter a valid address")
//     .required("Address is required"),
//   email: yup
//     .string()
//     .email("Enter a valid email")
//     .required("Email is required"),
//   dateOfBirth: yup.string().required("Date Of Birth is required"),
//   mobile: yup
//     .string()
//     .matches(/^[0][0-9]{9}$/, "Mobile format - 0xxxxxxxxx ")
//     .required(" Mobile number is required"),
// });

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

  const staff = useSelector((state) =>
    selectStaffById(state.staffs.staffList, id)
  );

  const status = useSelector((state) => state.staffs?.status);

  const operation = useSelector((state) => state.staffs?.operation);

  const error = useSelector((state) => state.staffs.error);

  useEffect(() => {
    console.log('operation',operation)
    if (status === "succeeded") {
      if (operation === "inserting") {
        dispatch(
          showInfo({ message: "staff has been successfully created." }));
          navigate("/staffs");
      } else if (operation === "updating") {
        dispatch(
          showInfo({message: "Staff has been successfully updated."})
        );
        navigate("/staffs");
      }

      
    }

    if (status === "failed") {
      if (operation === "inserting") {
        dispatch(
          showError({message: "Staff creation failed"}));
      } else if (operation === "updating") {
        dispatch(
          showError({message: "Staff updation failed"})
        );
      }
    }
  }, [status, operation]);

  const formik = useFormik({
    initialValues: staff,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (values.staffId) {
        dispatch(updateStaff({ id: values.staffId, data: values }));
      } else {
        dispatch(createStaff(values));
      }
    },
  });

  console.log('date type', typeof formik.values?.dateOfBirth)

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
            <Grid item xs={12}>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default StaffForm;
