import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Grid, Box, CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createBranch, updateBranch } from "../branchSlice";
import {
  showMessage,
  closeNotification,
} from "../../../features/notifications/notificationSlice";

const validationSchema = yup.object({
  name: yup.string().max(25, "must be 25 char or less").required("required"),
  address: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contactPerson: yup.string().required("required"),
  contactNumber: yup.string().required("required"),
});

// email: yup
// .string("Enter your email")
// .email("Enter a valid email")
// .required("Email is required"),
// password: yup
// .string("Enter your password")
// .min(8, "Password should be of minimum 8 characters length")
// .required("Password is required"),

const BranchForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectBranchById = (branches, id) => {
    if (id != "null") {
      return branches.find((branch) => branch.branchId == id);
    } else {
      return {
        id: null,
        name: "",
        email: "",
        address: "",
        contactNumber: "",
        contactPerson: "",
      };
    }
  };

  const branch = useSelector((state) =>
    selectBranchById(state.branches.branchList, id)
  );

  const status = useSelector((state) => state.branches?.status);

  const operation = useSelector((state) => state.branches?.operation);

  const error = useSelector((state) => state.branches?.error);

  useEffect(() => {
    if (status === "succeeded") {
      if (operation === "inserting") {

        dispatch(
          showMessage({
            message: "Branch has been successfully created.",
            type: "info",
            autoClose: true,
            open: true,
            remainingTime: 3000,
          })
        );
      } else if (operation === "updating") {
        dispatch(
          showMessage({
            message: "Branch has been successfully updated.",
            type: "info",
            autoClose: true,
            open: true,
            remainingTime: 3000,
          })
        );
      }

      navigate("/branches");
    }

    if (status === "failed") {
      if (operation === "inserting") {
        dispatch(
          showMessage({
            message: "Branch creation failed",
            type: "error",
            autoClose: true,
            open: true,
            remainingTime: 3000,
          })
        );
      } else if (operation === "updating") {
        dispatch(
          showMessage({
            message: "Branch updation failed",
            type: "error",
            autoClose: true,
            open: true,
            remainingTime: 3000,
          })
        );
      }
    }
  }, [status, operation]);

  const handleSubmit = async values => {
    if (values.branchId) {
      dispatch(updateBranch({ id: values.branchId, data: values }));
    } else {

      dispatch(createBranch(values));
    }
  }

  const formik = useFormik({
    initialValues: branch,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: {handleSubmit},
  });

  const modifyingStatus = useSelector(
    (state) => state.branches?.modifyingStatus
  );

  return (
    <div>
      {modifyingStatus === "pending" && <CircularProgress />}
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
                id="contactNumber"
                name="contactNumber"
                label="Contact Number"
                value={formik.values?.contactNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.contactNumber &&
                  Boolean(formik.errors.contactNumber)
                }
                helperText={
                  formik.touched.contactNumber && formik.errors.contactNumber
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="contactPerson"
                name="contactPerson"
                label="Contact Person"
                value={formik.values?.contactPerson}
                onChange={formik.handleChange}
                error={
                  formik.touched.contactPerson &&
                  Boolean(formik.errors.contactPerson)
                }
                helperText={
                  formik.touched.contactPerson && formik.errors.contactPerson
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                { id == 'null' ? 'Insert':'Update'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default BranchForm;
