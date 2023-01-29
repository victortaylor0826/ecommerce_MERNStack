import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCoupon } from "../../State/Coupon/couponAction";

export const CouponComponent = (props) => {
  const [coupon, setCoupon] = useState(null);
  let couponDispatcher = useDispatch();
  let couponValue = useSelector((state) => state.couponReducer);

  let generateCoupon = () => {
    let myCoup = Math.floor(Math.random() * 1000000);
    setCoupon(myCoup);
    couponDispatcher(addCoupon(myCoup));
    props.setIsValid(true);
  };
  return (
    <div>
      {coupon ? <h3> Generated Coupon: {coupon} </h3> : ""}
      {couponValue ? <h3>Value: {couponValue.value}</h3> : ""}
      <button onClick={generateCoupon}>GenerateCoupon</button>
    </div>
  );
};
