import React, { useEffect, useState } from "react";
import { Grid, TextField, Button } from "@mui/material";


import { useSelector, useDispatch } from "react-redux";
import {retrieveBatchDiscounts} from "./batchDiscountSlice"
import BatchDiscountItem from "./BatchDiscountItem";

const BatchDiscountGrid = ({
  batchId,
  setOperation,
  setselectedDiscount,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveBatchDiscounts());
  }, [batchId]);

  const discounts = useSelector(
    (state) => state.batchdiscount?.batchdiscountList
  );

const discountsList = discounts.filter((d)=>d.batchId==batchId);
console.log("discountsList",discountsList);

  return discountsList?.map((discount) => (
    <BatchDiscountItem key={discount.batchdiscountId}
      discountItem={discount}
      setselectedDiscount={setselectedDiscount}
      setOperation={setOperation}
    />
  ));
};

export default BatchDiscountGrid;
