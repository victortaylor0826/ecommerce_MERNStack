import * as actionTypes from "../actionTypes";
import axios from "axios";

export const addToCart = (product) => {
  return {
    type: actionTypes.CART_ADDITEM,
    payload: product,
  };
};

export const clearCart = () => {
  return {
    type: actionTypes.CART_CLEAR,
  };
};

export const updateCart = (item) => {
  return {
    type: actionTypes.CART_UPDATEITEM,
    payload: item,
  };
};

export const addToDB = (cart, userId) => {
  return function (dispatch) {
    window
      .fetch("http://localhost:9000/cart/api/saveToDb", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, cart: cart.items }),
      })

      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log("err while saving cart", err));
  };
};

export const removeItem = (id) => {
  return {
    type: actionTypes.CART_REMOVEITEM,
    payload: id,
  };
};

export const reOrder = (cart) => {
  return function(dispatch){
    cart.map((elem) => {
      dispatch(addToCart(elem));

    })
  }
};


export const removeCartFromDb = (userId) => {
  console.log("removing cart from Db for userID", userId);
  return function (dispatch) {
    axios
      .post("http://localhost:9000/cart/api/removeCart", { userId })
      .then((serverData) => dispatch(clearCart()))
      .catch((err) => console.log("There was an error deleting cart", err));
  };
};

export const getUserCart = (userId) => {
  return function (dispatch) {
    window
      .fetch("http://localhost:9000/cart/api/getUserCart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("user cart", data);
        // dispatch(clearCart());
        if (data) {
          for (const item of data.cart) {
            dispatch(addToCart(item));
          }
        }
      })
      .catch((err) => console.log(" got an error in reducer", err));
  };
};
