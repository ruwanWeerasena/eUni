export const msalConfig = {
    auth: {
      clientId: "f7931e5a-b318-4f08-94ea-b234ac009471",
      authority: "https://login.microsoftonline.com/fd8a5809-4fda-4970-af8f-cb5995749eb0", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
      redirectUri: "http://localhost:3000",
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };
  
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
   scopes: ["User.Read","api://euni-admin-api/manage-branches","api://euni-admin-api/read-branch"]
  };
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
      graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
  };