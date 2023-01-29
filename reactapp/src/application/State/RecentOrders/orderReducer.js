import * as actionTypes from "../actionTypes";

const initialState = [];

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_ADDORDER:
      console.log("from orderReducer", action.payload);
      if (action.payload) return [...state, action.payload];
      else return [...state];
    case actionTypes.ORDER_CLEAR:
      return [];
    default:
      return state;
  }
};
