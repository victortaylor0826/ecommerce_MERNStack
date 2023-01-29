import * as actionTypes from "../actionTypes";

export const addCoupon = (coupon) => {
  if (coupon != null) {
    return {
      type: actionTypes.COUPON_ADDCOUPON,
      payload: 10,
    };
  } else {
    console.log("Not a valid coupon");
  }
};
