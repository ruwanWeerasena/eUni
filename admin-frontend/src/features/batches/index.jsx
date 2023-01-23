import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchesBatches, selectBatches } from "./batchesSlice";

const Batches = () => {
  const dispatch = useDispatch();

  const batches = useSelector(selectBatches);
  const loadingStatus = useSelector((state) => state.batches.status);

  useEffect(() => {
    dispatch(fetchesBatches());
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
    {batches.map(batch => <div>{ batch.name}</div>)}
  </div>;
};

export default Batches;
