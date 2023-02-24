import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { retrieveLecturers, deleteLecturer } from "./lecturerSlice";
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

const Lecturers = () => {
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
    dispatch(deleteLecturer({ id: selectedDeleteId }));
    dispatch(retrieveLecturers());
    setOpen(false);
  };

  const lecturers = useSelector((state) => state.lecturers?.lecturerList);


  const loadingStatus = useSelector((state) => state.lecturers?.status);

  useEffect(() => {
    dispatch(retrieveLecturers());
  }, []);



  if (loadingStatus === "loading") {
    return (
      <CircularProgress />
    );
  }

  const edit = (id) => {
    navigate(`/lecturers/${id}`);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={8} sx={{textAlign:'left'}}>
          <Typography variant="h4" color='grey' gutterBottom>
            Lecturers
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{textAlign:'right'}}>
          <Button variant="outlined" onClick={() => edit(null)}>New Lecturer</Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Date of Birth</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Mobile</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lecturers?.map((lecturer) => (
              <StyledTableRow key={lecturer.lecturerId}>
                <StyledTableCell component="th" scope="row">
                  {lecturer.name}
                </StyledTableCell>
                <StyledTableCell>{lecturer.address}</StyledTableCell>
                <StyledTableCell>{lecturer.dateOfBirth}</StyledTableCell>
                <StyledTableCell>{lecturer.email}</StyledTableCell>
                <StyledTableCell>{lecturer.mobile}</StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    onClick={() => onDelete(lecturer.lecturerId)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    onClick={() => edit(lecturer.lecturerId)}
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
      </Dialog>
    </div>
  );
};

export default Lecturers;
