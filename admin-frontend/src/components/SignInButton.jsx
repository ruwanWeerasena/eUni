import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { Button } from "@mui/material";
import axios from 'axios'


export const SignInButton = () => {
  const { instance, accounts } = useMsal();

  const handleLogin = async (loginType) => {
    if (loginType === "popup") {
      const response = await instance.loginPopup(loginRequest);

      const tokenRequest = {
        account: response.account, // This is an example - Select account based on your app's requirements
        scopes: ["api://euni-admin-api/manage-branches","api://euni-admin-api/read-branch"]
    }
      const tokenResponse = await instance.acquireTokenSilent(tokenRequest);
      
      const accesstoken = tokenResponse.accessToken;


      axios.interceptors.request.use(
        config => {

          config.headers['Authorization'] = 'Bearer ' +  accesstoken;

          // config.headers['Content-Type'] = 'application/json';
          return config
        },
        error => {
          Promise.reject(error)
        }
      )

      //axios.defaults.headers.common['Authorization'] = tokenResponse.accessToken;

      // axios.interceptors.request.use(
      //   config => {
   
      //     if (token) {
      //       config.headers['Authorization'] = 'Bearer ' + token
      //     }
      //     // config.headers['Content-Type'] = 'application/json';
      //     return config
      //   },
      //   error => {
      //     Promise.reject(error)
      //   }
      // )

    }
  };
  return (
    <Button
      variant="secondary"
      className="ml-auto"
      onClick={() => handleLogin("popup")}
    >
      Sign in using Popup
    </Button>
  );
};
