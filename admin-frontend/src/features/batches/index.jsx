import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchesBatches, selectBatches } from "./batchesSlice";
import { useMsal } from "@azure/msal-react";

const Batches = () => {
  const dispatch = useDispatch();
  const { instance, accounts } = useMsal();

  const batches = useSelector(selectBatches);
  const loadingStatus = useSelector((state) => state.batches.status);

  useEffect(() => {
    dispatch(fetchesBatches());

    // const fetchData = async () => {
    //   console.log('---------gettoken----------');
    //   const tokenRequest = {
    //     account: accounts[0], // This is an example - Select account based on your app's requirements
    //     scopes: ["api://euni-admin-api/manage-branches","api://euni-admin-api/read-branch"]
    // }
    //   const res = await instance.acquireTokenSilent(tokenRequest);
    //   console.log('------access token---------',res.accessToken)
    // }
    //fetchData();
  }, []);

  console.log('loading state', loadingStatus)

  if (loadingStatus === "loading") {
    return (
      <div className="todo-list">
        <div className="loader" />
      </div>
    );
  }

  return <div>
    <p>Batches</p>
    {batches.map(batch => <div key={batch.batchId}>{ batch.name}</div>)}
  </div>;
};

export default Batches;
