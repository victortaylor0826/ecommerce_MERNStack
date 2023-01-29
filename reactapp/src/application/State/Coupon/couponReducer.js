import * as actionTypes from "../actionTypes";

const initialState = {
  value: 0,
};

export const couponReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.COUPON_ADDCOUPON:
      return { value: action.payload };
    default:
      return state;
  }
};
