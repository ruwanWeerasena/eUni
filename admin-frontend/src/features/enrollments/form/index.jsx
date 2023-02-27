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
import { retrieveBatchByCourse } from "../../batches/batchesSlice";

import { retrieveCourses, getAllCourses } from "../../courses/courseSlice";
import { retrieveEnrollments } from "../enrollmentSlice";

const validationSchema = yup.object({});

// email: yup
// .string("Enter your email"),
// .email("Enter a valid email")
// .required("Email is required"),
// password: yup
// .string("Enter your password")
// .min(8, "Password should be of minimum 8 characters length")
// .required("Password is required"),

const EnrollmentForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // dispatch(retrieveBranches());
    // dispatch(retrieveStaffs());
    dispatch(retrieveCourses());
    dispatch(retrieveEnrollments());
  }, []);

  const courses = useSelector((state)=>state.courses?.entities);
  // console.log(Object.keys(courses))
  console.log(courses);
  

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
        startDate: "",
        endDate: "",
      };
    }
  };

  // const batch = useSelector((state) =>
  //   selectBatchById(state.batches.batchList, id)
  // );
  // const branches = useSelector((state) => {
  //   const list = state.branches?.branchList;
  //   return [{ branchId: 0, name: "Select Branch" }, ...list];
  // });
  // const staffs = useSelector((state) => {
  //   const list = state.staffs?.staffList;
  //   return [{ staffId: 0, name: "Select Staff" }, ...list];
  // });

  // const lecturers = useSelector((state) => {
  //   const list = state.lecturers?.lecturerList;
  //   return [{ lecturerId: 0, name: "Select Lecturer" }, ...list];
  // });


  const batches = useSelector((state) => state.batches.batchList);


  // const formik = useFormik({
  //   initialValues: null,
  //   validationSchema: validationSchema,
  //   enableReinitialize: true,
  //   onSubmit: (values) => {
  //     if (values.batchId) {
  //       dispatch(updateBatch({ id: values.batchId, data: values }));
  //     } else {
  //       dispatch(createBatch(values));
  //     }

  //     // navigate("/batches");
  //   },
  // });

  const getAvailBatches = (CourseId)=>{
    dispatch(retrieveBatchByCourse({id:CourseId}));
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <form onSubmit={ false}>
          <Grid container spacing={2}>
            <Grid item xs={4} >
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="studentId"
                  name="studentId"
                  label="Student Id"
                />
              </Grid>
              <Grid item xs={12}>
                <Box>
                  stduent details
                </Box>
              </Grid>
             
            </Grid>
            <Grid item xs={4}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Course</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="courseSelect"
                  name="courseSelect"
                  
                  label="Courses"
                  onChange={(e)=>{getAvailBatches(e.target.value)}}
                >
                  {Object.keys(courses).map((id) => (
                    <MenuItem value={courses[id].id}>{courses[id].name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid  item xs={4}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Available Batches</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="batchselect"
                  name="batchselect"
                  
                  // onChange={}
                >
                  {batches.map((batch) => (
                    <MenuItem value={batch.batcnId}>{batch.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
           
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default EnrollmentForm;
