import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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

import "../../App.css";
import { retrieveEnrollments } from "./enrollmentSlice";


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

const Enrollments = () => {
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
    // dispatch(deleteLecturer({ id: selectedDeleteId }));
    // dispatch(retrieveLecturers());
    setOpen(false);
  };

  const enrollments = useSelector((state) => state.enrollments?.enrollmentList);


  const loadingStatus = useSelector((state) => state.enrollments?.status);

  useEffect(() => {
    dispatch(retrieveEnrollments());
  }, []);



  if (loadingStatus === "loading") {
    return (
      <CircularProgress />
    );
  }

  const edit = (id) => {
    navigate(`/enrollment/new`);
  };
  console.log(enrollments);

  return (
    <div>
      <Grid container>
        <Grid item xs={8} sx={{textAlign:'left'}}>
          <Typography variant="h4" color='grey' gutterBottom>
            Enrollments
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{textAlign:'right'}}>
          <Button variant="outlined" onClick={() => edit(null)}>New Enrollment</Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>StudentName</StyledTableCell>
              <StyledTableCell>BAtchName</StyledTableCell>
              <StyledTableCell>StaffName</StyledTableCell>
              <StyledTableCell>BatchDiscount</StyledTableCell>
              <StyledTableCell>Installment Method</StyledTableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {enrollments?.map((enrollment) => (
              <StyledTableRow key={enrollment.enrollmentId}>
                <StyledTableCell component="th" scope="row">
                  {enrollment.studentName}
                </StyledTableCell>
                <StyledTableCell>{enrollment.batchName}</StyledTableCell>
                <StyledTableCell>{enrollment.staffName}</StyledTableCell>
                <StyledTableCell>{enrollment.batchDiscountsPercentage || 'no discount'}</StyledTableCell>
                <StyledTableCell>{enrollment.installmentMethod}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Lecturer"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete Lecturer?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deleteConfirm} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
};

export default Enrollments;
