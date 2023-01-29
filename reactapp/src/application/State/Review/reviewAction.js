import * as actionTypes from "../actionTypes";
import axios from "axios";

export const addReview = (review) => {
  return {
    type: actionTypes.REVIEW_ADD,
    payload: review,
  };
};

export const clearReviews = () => {
  return {
    type: actionTypes.REVIEW_CLEAR,
  };
};

export const addReviewToDb = (review) => {
  return function (dispatch) {
    console.log("from adRevie", review);
    axios
      .post("http://localhost:9000/review/api/addReview", { review })
      .then((serverData) => console.log(serverData.data))
      .catch((err) => console.log("caught an error while adding review", err));
  };
};

export const getReviewsByProductId = (productId) => {
  return function (dispatch) {
    axios
      .get(
        `http://localhost:9000/review/api/getReviewsByProductId/${productId}`
      )
      .then((serverData) => {
        console.log("serverData.data", serverData.data);
        dispatch(clearReviews());
        dispatch(addReview(serverData.data));
      })
      .catch((err) => console.log("error while fetchin review", err));
  };
};
