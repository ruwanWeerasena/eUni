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
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button variant="secondary" className="ml-auto" onClick={() => navigate(`/staffs`)}>Staffs</Button>
            {isAuthenticated ? <SignOutButton /> : <SignInButton />}
          </Toolbar>
        </AppBar>
      </Box>

      <h5>
        <center>
          Welcome to the Microsoft Authentication Library For React Tutorial
        </center>
      </h5>
      <br />
      <br />
      {props.children}
    </>
  );
};

export default Header;
