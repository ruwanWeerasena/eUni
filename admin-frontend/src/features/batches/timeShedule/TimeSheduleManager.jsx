import { Grid, TextField, Button, Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import React, { useEffect, useState } from "react";


import { Formik, useFormik } from "formik";
import * as yup from "yup";

import { useSelector, useDispatch } from "react-redux";
import {
  createTimeShedule,
  updateBatchTimeShedule,
  deleteBatchTimeShedule,
} from "./timeSheduleSlice";

const validationSchema = yup.object({});

const TimeSheduleManager = ({
  timeShedule,
  batchId,
  operation,
  setSelectedTimeShedule,
  setOperation,
}) => {
  const dispatch = useDispatch();

  const reset = () => {
    setSelectedTimeShedule({
      day: "Sunday",
      startTime: "",
      endTime: "",
    });
    setOperation("add");
  };

  const formik = useFormik({
    initialValues: timeShedule,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      switch (operation) {
        case "add":
          console.log("add", values);
          dispatch(createTimeShedule({ ...values, batchId: batchId }));
          break;
        case "edit":
          dispatch(
            updateBatchTimeShedule({
              id: timeShedule.batchTimeSheduleId,
              data: {
                ...values,
                batchTimeSheduleId: timeShedule.batchTimeSheduleId,
                batchId: batchId,
              },
            })
          );
          break;
        case "delete":
          dispatch(
            deleteBatchTimeShedule({
              id: timeShedule.batchTimeSheduleId,
            })
          );
          break;
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        m={1}
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        ml={5}
        mr={5}
      >
        <Box flexGrow={1} mr={1}>
          <FormControl fullWidth>
            <InputLabel id="day">Day of the Week</InputLabel>
            <Select
              labelId="day"
              id="day"
              name="day"
              value={formik.values?.day}
              label="Day"
              onChange={formik.handleChange}
            >
              <MenuItem value="Sunday">Sunday</MenuItem>
              <MenuItem value="Monday">Monday</MenuItem>
              <MenuItem value="Tuesday">Tuesday</MenuItem>
              <MenuItem value="Wednesday">Wednesday</MenuItem>
              <MenuItem value="Thursday">Thursday</MenuItem>
              <MenuItem value="Friday">Friday</MenuItem>
              <MenuItem value="Saturday">Saturday</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box mr={1}>
          <TextField
            fullWidth
            id="startTime"
            name="startTime"
            label="Start Time"
            value={formik.values?.startTime}
            onChange={formik.handleChange}
            error={formik.touched.startTime && Boolean(formik.errors.startTime)}
            helperText={formik.touched.startTime && formik.errors.startTime}
          />
        </Box>

        <Box mr={1}>
          <TextField
            fullWidth
            id="endTime"
            name="endTime"
            label="End Time"
            value={formik.values?.endTime}
            onChange={formik.handleChange}
            error={formik.touched.endTime && Boolean(formik.errors.endTime)}
            helperText={formik.touched.endTime && formik.errors.endTime}
          />
        </Box>
        <Box mr={1}>
          <Button type="submit" variant="outlined">
            {timeShedule.batchTimeSheduleId
              ? operation === "edit"
                ? "Update"
                : "Delete"
              : "Add"}
          </Button>
        </Box>
        <Box>
          {timeShedule.batchTimeSheduleId && (
            <Button onClick={() => reset()} variant="outlined">
              Reset
            </Button>
          )}
        </Box>
      </Box>
    </form>
  );
};

export default TimeSheduleManager;
