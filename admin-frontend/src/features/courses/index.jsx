import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {retrieveCourses,deleteCourse, getAllCourses,resetModifying} from "./courseSlice";
import { useMsal } from "@azure/msal-react";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Typography from '@mui/material/Typography';



import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Grid,
} from "@mui/material";
import {
  showMessage,
  closeNotification,
} from "../../features/notifications/notificationSlice";

import "../../App.css";
import { grey } from "@mui/material/colors";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Courses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const { instance, accounts } = useMsal();

  const [selectedDeleteId, setSelectedDeleteId] = useState(undefined);

  const [open, setOpen] = useState(false);

  const onDelete = (id) => {
    setSelectedDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteConfirm = async () => {
    dispatch(deleteCourse({ id: selectedDeleteId })).then((x)=>{dispatch(resetModifying())});
    setOpen(false);
  };

  //const courses = useSelector((state) => state.courses);
  const courses = useSelector(getAllCourses.selectAll);

  const status = useSelector((state) => state.courses?.status);
  const operation = useSelector((state) => state.courses?.operation);

  // useEffect(() => {
  //   dispatch(retrieveCourses());
  // }, []);
  useEffect(() => {
    if (courses.length === 0) {
      dispatch(retrieveCourses());
    } else {
      dispatch(resetModifying());
    }
  }, []);
  useEffect(() => {
    if (status.modifyingStatus === "succeeded") {
      if (operation === "deleting") {
        dispatch(
          showMessage({
            message: "course  has been deleted successfully",
            type: "info",
            autoClose: true,
            open: true,
            remainingTime: 3000,
          })
        );
      }
    }

    if (status === "failed") {
      if (operation === "deleting") {
        dispatch(
          showMessage({
            message: "course  deletion fail",
            type: "error",
            autoClose: true,
            open: true,
            remainingTime: 3000,
          })
        );
      }
    }
  }, [status, operation]);

  if (status.retrievingStatus === "loading") {
    return (
      <CircularProgress />
    );
  }
  if (status.modifyingStatus === "pending") {
    return (
      <CircularProgress />
    );
  }

  const edit = (id) => {
    navigate(`/courses/${id}`);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={8} sx={{textAlign:'left'}}>
          <Typography variant="h4" color='grey' gutterBottom>
            Courses
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{textAlign:'right'}}>
          <Button variant="outlined" onClick={() => edit(null)}>New Course</Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Entry Requirement</StyledTableCell>
              <StyledTableCell>Awading Body</StyledTableCell>
              <StyledTableCell>Contact Detail</StyledTableCell>
              <StyledTableCell>Information URL</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses?.map((course) => (
              <StyledTableRow key={course.courseId}>
                <StyledTableCell component="th" scope="row">
                  {course.name}
                </StyledTableCell>
                <StyledTableCell>{course.entryRequirement}</StyledTableCell>
                <StyledTableCell>{course.awadingBody}</StyledTableCell>
                <StyledTableCell>{course.contactDetail}</StyledTableCell>
                <StyledTableCell>{course.informationUrl}</StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    onClick={() => onDelete(course.courseId)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    onClick={() => edit(course.courseId)}
                    aria-label="update"
                  >
                    <EditIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Staff"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete Course?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deleteConfirm} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Courses;
