import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "../../components/SignInButton";
import { SignOutButton } from "../../components/SignOutButton";

import { useNavigate, Link } from "react-router-dom";

const Header = (props) => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1, textAlign: "left" }}>
            <Button
              variant="secondary"
              className="ml-auto"
              onClick={() => navigate(`/branches`)}
            >
              Branch
            </Button>
            <Button
              variant="secondary"
              className="ml-auto"
              onClick={() => navigate(`/staffs`)}
            >
              Staff
            </Button>

            <Button
              variant="secondary"
              className="ml-auto"
              sx={{ color: "white" }}
              onClick={() => {
                navigate("./students");
              }}
            >
              Student
            </Button>
            <Button
              variant="secondary"
              className="ml-auto"
              onClick={() => navigate(`/batches`)}
            >
              Batch
            </Button>

            <Button
              variant="secondary"
              className="ml-auto"
              sx={{ color: "white" }}
              onClick={() => {
                navigate("./lecturers");
              }}
            >
              {" "}
              Lecturer{" "}
            </Button>
          </Box>
          <Box>{isAuthenticated ? <SignOutButton /> : <SignInButton />}</Box>
        </Toolbar>
      </AppBar>

      <br />
      <br />
      {props.children}
    </>
  );
};

export default Header;
