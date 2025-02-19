import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { retrieveBranches, deleteBranch, resetModifying } from "./branchSlice";

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
import Typography from "@mui/material/Typography";

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
  showInfo,
  showError,
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

const Branches = () => {
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
    dispatch(deleteBranch({ id: selectedDeleteId })).then((x) => {
      dispatch(resetModifying());
    });
    //dispatch(retrieveBranches());
    setOpen(false);
  };

  const branches = useSelector((state) => state.branches?.branchList);

  const status = useSelector((state) => state.branches?.status);
  const operation = useSelector(
    (state) => state.branches?.operation
  );

  const error = useSelector((state) => state.branches?.error);

  useEffect(() => {
    if (branches.length === 0) {
      dispatch(retrieveBranches());
    } else {
      dispatch(resetModifying());
    }
  }, []);

  const edit = (id) => {
    navigate(`/branchesx/${id}`);
  };

  useEffect(() => {
    if (status === "succeeded") {
      if (operation === "deleting") {
        dispatch(showInfo({message: "Staff members has been deleted successfully"}));
      }
    }

    if (status === "failed") {
      if (operation === "deleting") {
        dispatch(showError({message: "Staff members deletion fail"}));
      }
    }
  }, [status, operation]);


  if (status === "loading") {
    return <CircularProgress />;
  }

  if (status === "pending") {
    return <CircularProgress />;
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={8} sx={{ textAlign: "left" }}>
          <Typography variant="h4" color="grey" gutterBottom>
            Branches
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: "right" }}>
          <Button variant="outlined" onClick={() => edit(null)}>
            New Branch
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Contact Number</StyledTableCell>
              <StyledTableCell>Contact Person</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {branches?.map((branch) => (
              <StyledTableRow key={branch.branchId}>
                <StyledTableCell component="th" scope="row">
                  {branch.name}
                </StyledTableCell>
                <StyledTableCell>{branch.address}</StyledTableCell>
                <StyledTableCell>{branch.email}</StyledTableCell>
                <StyledTableCell>{branch.contactNumber}</StyledTableCell>
                <StyledTableCell>{branch.contactPerson}</StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    onClick={() => onDelete(branch.branchId)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    onClick={() => edit(branch.branchId)}
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
            Are you sure to delete Branch?
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

export default Branches;
