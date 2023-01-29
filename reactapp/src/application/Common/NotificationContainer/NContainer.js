import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  seenNotification,
} from "../../State/Notification/notificationActions";
import "./NContainer.css";
import { useNavigate } from "react-router-dom";

export const NContainer = () => {
  let notifications = useSelector((state) => state.notificationReducer);
  let user = useSelector((state) => state.userReducer);
  let notificationDispatcher = useDispatch();
  let navigate = useNavigate();

  const handleSeen = (elem) => {
    notificationDispatcher(seenNotification(elem._id, user.userDetail._id));
    console.log("elem.identifier", elem.identifier);
    if (elem.identifier) {
      switch (elem.identifier) {
        case "shop":
          navigate("/productList");
          return;
        case "order":
          navigate("/order");
          return;
        case "cart":
          navigate("/cart");
          return;
      }
    }
  };
  useEffect(() => {}, []);

  return (
    <div className="notification_container">
      {notifications.length >= 1
        ? notifications.map((elem, key) => {
            return (
              <div
                onClick={() => handleSeen(elem)}
                className={`notification_bar ${
                  elem.seen ? "notification_seen" : ""
                }`}
                key={key}
              >
                {elem.title}
                {elem.seen ? (
                  <span style={{ color: "green" }}>&#x2713;</span>
                ) : (
                  ""
                )}
              </div>
            );
          })
        : ""}
    </div>
  );
};
