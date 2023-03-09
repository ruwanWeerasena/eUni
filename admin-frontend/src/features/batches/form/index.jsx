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
import { retrieveLecturers } from "../../lecturers/lecturerSlice";
import { retrieveCourses, getAllCourses } from "../../courses/courseSlice";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const validationSchema = yup.object({});

// email: yup
// .string("Enter your email"),
// .email("Enter a valid email")
// .required("Email is required"),
// password: yup
// .string("Enter your password")
// .min(8, "Password should be of minimum 8 characters length")
// .required("Password is required"),

const BatchForm = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(retrieveBranches());
    dispatch(retrieveStaffs());
    dispatch(retrieveCourses());
    dispatch(retrieveLecturers());
  }, []);

  const selectBatchById = (batches, id) => {
    if (id != "null") {
      return batches.find((batch) => batch.batchId == id);
    } else {
      return {
        courseId: 0,
        branchId: 0,
        inchargeStaffId: 0,
        inchargeLecturerId: 0,
        name: "",
        startDate: new Date(),
        endDate: new Date(),
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
    const list = state.staffs?.staffList;
    return [{ staffId: 0, name: "Select Staff" }, ...list];
  });

  const lecturers = useSelector((state) => {
    const list = state.lecturers?.lecturerList;
    return [{ lecturerId: 0, name: "Select Lecturer" }, ...list];
  });

  let courses = useSelector(getAllCourses.selectAll);
  courses = [{ courseId: 0, name: "Select Course" }, ...courses];

  const batches = useSelector((state) => state.batches);

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
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="branchId">Branch</InputLabel>
                <Select
                  labelId="branchId"
                  id="branchId"
                  name="branchId"
                  value={formik.values?.branchId}
                  label="Branch"
                  onChange={formik.handleChange}
                >
                  {branches.map((branch) => (
                    <MenuItem key={branch.branchId} value={branch.branchId}>
                      {branch.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {formik.touched.name && formik.errors.name}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="inchargeStaffId">Staffs</InputLabel>
                <Select
                  labelId="inchargeStaffId"
                  id="inchargeStaffId"
                  name="inchargeStaffId"
                  value={formik.values?.inchargeStaffId}
                  label="Staffs"
                  onChange={formik.handleChange}
                >
                  {staffs.map((staff) => (
                    <MenuItem key={staff.staffId} value={staff.staffId}>
                      {staff.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {formik.touched.name && formik.errors.name}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="courseId">Courses</InputLabel>
                <Select
                  labelId="courseId"
                  id="courseId"
                  name="courseId"
                  value={formik.values?.courseId}
                  label="Courses"
                  onChange={formik.handleChange}
                >
                  {courses.map((course) => (
                    <MenuItem key={course.courseId} value={course.courseId}>
                      {course.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {formik.touched.name && formik.errors.name}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="inchargeLecturerId">Lecturers</InputLabel>
                <Select
                  labelId="inchargeLecturerId"
                  id="inchargeLecturerId"
                  name="inchargeLecturerId"
                  value={formik.values?.inchargeLecturerId}
                  label="Lecturers"
                  onChange={formik.handleChange}
                >
                  {lecturers.map((lecturer) => (
                    <MenuItem
                      key={lecturer.lecturerId}
                      value={lecturer.lecturerId}
                    >
                      {lecturer.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {formik.touched.name && formik.errors.name}
                </FormHelperText>
              </FormControl>
            </Grid>
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
            <Grid item xs={6}>
              {/* <TextField
                fullWidth
                id="startDate"
                name="startDate"
                label="Start Date"
                value={formik.values?.startDate}
                onChange={formik.handleChange}
                error={
                  formik.touched.startDate && Boolean(formik.errors.startDate)
                }
                helperText={formik.touched.startDate && formik.errors.startDate}
              /> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  id="startDate"
                  name="startDate"
                  value={formik.values?.startDate}
                  onChange={(date) => formik.setFieldValue("startDate", date)}
                  renderInput={(props) => <TextField fullWidth {...props} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              {/* <TextField
                fullWidth
                id="endDate"
                name="endDate"
                label="End Date"
                value={formik.values?.endDate}
                onChange={formik.handleChange}
                error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                helperText={formik.touched.endDate && formik.errors.endDate}
              /> */}

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  id="endDate"
                  name="endDate"
                  value={formik.values?.endDate}
                  onChange={(date) => formik.setFieldValue("endDate", date)}
                  renderInput={(props) => <TextField fullWidth {...props} />}
                />
              </LocalizationProvider>
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
