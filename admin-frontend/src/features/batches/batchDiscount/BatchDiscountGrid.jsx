import React, { useEffect, useState } from "react";
import { Grid, TextField, Button } from "@mui/material";


import { useSelector, useDispatch } from "react-redux";
import {retrieveBatchDiscounts} from "./batchDiscountSlice"
import BatchDiscountItem from "./BatchDiscountItem";

const BatchDiscountGrid = ({
  batchId,
  setOperation,
  setSelectedBatchDiscount,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveBatchDiscounts());
  }, [batchId]);

  const discounts = useSelector(
    (state) => state.batchDiscounts.batchDiscountList
  );


const discountsList = discounts.filter((d)=>d.batchId==batchId);


  return discountsList?.map((discount) => (
    <BatchDiscountItem key={discount.batchdiscountId}
      discountItem={discount}
      setSelectedBatchDiscount={setSelectedBatchDiscount}
      setOperation={setOperation}
    />
  ));
};

export default BatchDiscountGrid;
