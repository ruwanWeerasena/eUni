import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { retrieveStudent,deleteStudent } from "./studentSlice";

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

import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Grid,
  Typography
} from "@mui/material";

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

const Students = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    console.log('delete confirmation', selectedDeleteId)
    dispatch(deleteStudent({id:selectedDeleteId}));
    setOpen(false);
  };

  const students = useSelector((state) => state.students.studentlist);
  
  const loadingStatus = useSelector((state) => state.students.status);

  useEffect(() => {
    dispatch(retrieveStudent());
  }, []);


  if (loadingStatus === "loading") {
    return (
      <CircularProgress />
    );
  }

  const edit = (id) => {
    navigate(`/students/${id}`);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={8} sx={{textAlign:'left'}}>
          <Typography variant="h4" color='grey' gutterBottom>
            Students
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{textAlign:'right'}}>
          <Button variant="outlined" onClick={() => edit(null)}>New Student</Button>
        </Grid>
      </Grid>
    

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>DOB</StyledTableCell>
              <StyledTableCell>Street</StyledTableCell>
              <StyledTableCell>City</StyledTableCell>
              <StyledTableCell>State</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Mobile</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <StyledTableRow key={student.studentId}>
                <StyledTableCell component="th" scope="row">{student.name}</StyledTableCell>
                <StyledTableCell>{student.dateOfBirth}</StyledTableCell>
                <StyledTableCell>{student.street}</StyledTableCell>
                <StyledTableCell>{student.city}</StyledTableCell>
                <StyledTableCell>{student.state}</StyledTableCell>
                <StyledTableCell>{student.email}</StyledTableCell>
                <StyledTableCell>{student.mobile}</StyledTableCell>
                <StyledTableCell>
                  <IconButton onClick={() => onDelete(student.studentId)} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    onClick={() => edit(student.studentId)}
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
      <Box>
        <Button onClick={() => edit(null)}>New Student</Button>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Staff"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete Student?
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

export default Students;
