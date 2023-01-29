import * as actionTypes from "../actionTypes";
import axios from "axios";

const add = (notification) => {
  return {
    type: actionTypes.NOTIFICATION_ADD,
    payload: notification,
  };
};

export const clearNotification = () => {
  return {
    type: actionTypes.NOTIFICATION_CLEAR,
  };
};

export const addNotification = (notification) => {
  return function (dispatch) {
    axios
      .post("http://localhost:9000/notification/api/addNotification", {
        notification,
      })
      .then((serverData) => {
        dispatch(add(serverData.data));
      })
      .catch((err) => console.log("err while adding notification to DB", err));
  };
};

export const fetchNotifications = (userId) => {
  return function (dispatch) {
    axios
      .get(`http://localhost:9000/notification/api/getNotifications/${userId}`)
      .then((serverData) => {
        dispatch(clearNotification());
        serverData.data.map((elem) => {
          dispatch(add(elem));
        });
      })
      .catch((err) => console.log("err while fetching notifications", err));
  };
};

export const seenNotification = (id, userId) => {
  return function (dispatch) {
    axios
      .post("http://localhost:9000/notification/api/updateSeen", { id })
      .then(() => dispatch(fetchNotifications(userId)))
      .catch((err) => console.log("err while updating seen", err));
  };
};
