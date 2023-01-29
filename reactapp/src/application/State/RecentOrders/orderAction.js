import * as actionTypes from "../actionTypes";
import axios from "axios";

export const addOrder = (order) => {
  return {
    type: actionTypes.ORDER_ADDORDER,
    payload: order,
  };
};

export const addOrderToDb = (order) => {
  return (dispatch) => {
    axios
      .post("http://localhost:9000/order/api/saveToDb", order)
      .then((serverData) => dispatch(addOrder(serverData.data)))
      .catch((err) => console.log("error while adding your order", err));
  };
};

export const fetchOrders = (userId) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:9000/order/api/fetchOrder`, { userId })
      .then((serverData) => {
        dispatch(clearRecentOrders());
        serverData.data.map((elem) => {
          return dispatch(addOrder(elem));
        });
      })
      .catch((err) => console.log("error fetching orders", err));
  };
};

export const cancelOrder = (userId, id, status) => {
  return function (dispatch) {
    console.log("from cancel order", id);
    axios
      .post("http://localhost:9000/order/api/cancelOrder", {
        orderId: id,
        status,
      })
      .then((serverData) => dispatch(fetchOrders(userId)))
      .catch((err) => console.log("error while canceling order", err));
  };
};

export const deleteOrder = (userId, id) => {
  return function (dispatch) {
    axios
      .post("http://localhost:9000/order/api/deleteOrder", {
        orderId: id,
      })
      .then((serverData) => dispatch(fetchOrders(userId)))
      .catch((err) => console.log("error while deleting order", err));
  };
};

export const clearRecentOrders = () => {
  return {
    type: actionTypes.ORDER_CLEAR,
  };
};
