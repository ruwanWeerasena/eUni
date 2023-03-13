import React, { useState,useEffect } from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Grid, Box,CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createCourse, updateCourse, getAllCourses } from "../courseSlice";
import {
  showInfo,showError
} from "../../../features/notifications/notificationSlice";

const validationSchema = yup.object({});

// awadingBody: yup
// .string("Enter your awadingBody")
// .awadingBody("Enter a valid awadingBody")
// .required("Email is required"),
// password: yup
// .string("Enter your password")
// .min(8, "Password should be of minimum 8 characters length")
// .required("Password is required"),

const CourseForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const selectCourseById = (courses, id) => {
      
        
    if (id != "null") {
      return courses.find((course) => course.courseId == id);
    } else {
      return {
        id: null,
        name: "",
        entryRequirement:"",
        awadingBody: "",
        contactDetail: "",
        informationUrl: "",
      };
    }
  };

  const courses = useSelector(getAllCourses.selectAll);
  const status = useSelector((state) => state.courses?.status);
  const operation = useSelector((state) => state.courses?.operation);

  const course = selectCourseById(courses, id);

  useEffect(() => {
    if (status.modifyingStatus === "succeeded") {
      if (operation === "inserting") {
        dispatch(
          showInfo({
            message: "course has been successfully created."
          })
        );
      } else if (operation === "updating") {
        dispatch(
          showInfo({
            message: "course has been successfully updated."
          })
        );
      }

      navigate("/courses");
    }

    if (status.modifyingStatus === "failed") {
      if (operation === "inserting") {
        dispatch(
          showError({
            message: "course creation failed"
          })
        );
      } else if (operation === "updating") {
        dispatch(
          showError({
            message: "course updation failed"
          })
        );
      }
    }
  }, [status, operation]);


  const formik = useFormik({
    initialValues: course,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (values.courseId) {
        dispatch(updateCourse({ id: values.courseId, data: values }));
      } else {
        dispatch(createCourse(values));
      }

    
    },
  });

  if(status.modifyingStatus=="pending"){
    return (
      <CircularProgress />
    );
  }


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
                id="entryRequirement"
                name="entryRequirement"
                label="entryRequirement"
                value={formik.values?.entryRequirement}
                onChange={formik.handleChange}
                error={formik.touched.entryRequirement && Boolean(formik.errors.entryRequirement)}
                helperText={formik.touched.entryRequirement && formik.errors.entryRequirement}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="awadingBody"
                name="awadingBody"
                label="Awading Body"
                value={formik.values?.awadingBody}
                onChange={formik.handleChange}
                error={formik.touched.awadingBody && Boolean(formik.errors.awadingBody)}
                helperText={formik.touched.awadingBody && formik.errors.awadingBody}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="contactDetail"
                name="contactDetail"
                label="Contact Detail"
                value={formik.values?.contactDetail}
                onChange={formik.handleChange}
                error={
                  formik.touched.contactDetail &&
                  Boolean(formik.errors.contactDetail)
                }
                helperText={
                  formik.touched.contactDetail && formik.errors.contactDetail
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="informationUrl"
                name="informationUrl"
                label="Information Url"
                value={formik.values?.informationUrl}
                onChange={formik.handleChange}
                error={formik.touched.informationUrl && Boolean(formik.errors.informationUrl)}
                helperText={formik.touched.informationUrl && formik.errors.informationUrl}
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

export default CourseForm;
