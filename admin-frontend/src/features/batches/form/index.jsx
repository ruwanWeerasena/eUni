import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Grid, Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createBatch, updateBatch } from "../batchesSlice";
import { retrieveBranches } from "../../branches/branchSlice";
import { retrieveStaffs } from "../../staffs/staffSlice";

const validationSchema = yup.object({});

// email: yup
// .string("Enter your email")
// .email("Enter a valid email")
// .required("Email is required"),
// password: yup
// .string("Enter your password")
// .min(8, "Password should be of minimum 8 characters length")
// .required("Password is required"),

const BatchForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(retrieveBranches());
    dispatch(retrieveStaffs());
  }, []);

  const selectBatchById = (batches, id) => {
    if (id != "null") {
      return batches.find((batch) => batch.batchId == id);
    } else {
      return {
        batchId: null,
        courseId: 0,
        branchId: 0,
        staffId: 0,
        lecturerId: 0,
        name: "",
        startDate: "",
        endDate: "",
      };
    }
  };

  const batch = useSelector((state) =>
    selectBatchById(state.batches.batchList, id)
  );
  const branches = useSelector((state) => {
    const list = state.branches?.branchList;
    return [{ branchId: 0, name: "Select Branch" }, ...list];
  });
  const staffs = useSelector((state) => {
      const list = state.staffs;
      return [{ staffId: 0, name: 'Select Staff' }, ...list];
  });
  const batches = useSelector((state) => state.batches);

  console.log("batch", batch);

  const formik = useFormik({
    initialValues: batch,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (values.batchId) {
        dispatch(updateBatch({ id: values.batchId, data: values }));
      } else {
        dispatch(createBatch(values));
      }

      navigate("/batches");
    },
  });

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values?.branchId}
                  label="Branch"
                  onChange={formik.handleChange}
                >
                  {branches.map((branch) => (
                    <MenuItem value={branch.branchId}>{branch.name}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {formik.touched.name && formik.errors.name}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Staffs</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values?.staffId}
                  label="Staffs"
                  onChange={formik.handleChange}
                >
                  {staffs.map((staff) => (
                    <MenuItem value={staff.staffId}>{staff.name}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {formik.touched.name && formik.errors.name}
                </FormHelperText>
              </FormControl>
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

export default BatchForm;
