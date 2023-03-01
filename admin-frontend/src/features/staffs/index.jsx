import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { retrieveStaffs, deleteStaff, resetModifying } from "./staffSlice";
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

import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";

import {
  showMessage,
  closeNotification,
} from "../../features/notifications/notificationSlice";

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

const Staffs = () => {
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
    dispatch(deleteStaff({ id: selectedDeleteId })).then((x) => {
      dispatch(resetModifying());
    });
    setOpen(false);
  };

  const staffs = useSelector((state) => state.staffs.staffList);

  const fetchingStatus = useSelector((state) => state.staffs?.loadingStatus);
  const modifyingStatus = useSelector((state) => state.staffs?.modifingStatus);

  const error = useSelector((state) => state.branches?.error);

  useEffect(() => {
    if (staffs.length === 0) {
      dispatch(retrieveStaffs());
    } else {
      dispatch(resetModifying());
    }
  }, []);

  useEffect(() => {
    if (error) {
      dispatch(
        showMessage({
          message: "Staff has been successfully created." + Math.random(),
          type: "error",
          autoClose: true,
          open: true,
          remainingTime: 3000,
        })
      );
    }
  }, [error]);

  if (fetchingStatus === "loading") {
    return <CircularProgress />;
  }

  if (modifyingStatus === "pending") {
    return <CircularProgress />;
  }

  const edit = (id) => {
    navigate(`/staffs/${id}`);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={8} sx={{ textAlign: "left" }}>
          <Typography variant="h4" color="grey" gutterBottom>
            Staffs
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: "right" }}>
          <Button variant="outlined" onClick={() => edit(null)}>
            New Staff
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>DOB</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Mobile</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffs.map((staff) => (
              <StyledTableRow key={staff.staffId}>
                <StyledTableCell component="th" scope="row">
                  {staff.name}
                </StyledTableCell>
                <StyledTableCell>{staff.dateOfBirth}</StyledTableCell>
                <StyledTableCell>{staff.email}</StyledTableCell>
                <StyledTableCell>{staff.mobile}</StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    onClick={() => onDelete(staff.staffId)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    onClick={() => edit(staff.staffId)}
                    aria-label="delete"
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
            Are you sure to delete Staff?
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

export default Staffs;
