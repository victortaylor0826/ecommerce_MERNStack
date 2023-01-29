import * as actionTypes from "../actionTypes";

const initialState = [];

export const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REVIEW_ADD:
      console.log("adding review to state", action.paylaod);
      return [...state, ...action.payload];
    case actionTypes.REVIEW_CLEAR:
      return [];
    default:
      return state;
  }
};
