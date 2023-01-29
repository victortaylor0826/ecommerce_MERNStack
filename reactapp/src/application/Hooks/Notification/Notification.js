import React from "react";
import "./Notification.css";

export const Notification = (props) => {
  return (
    <div className="notification_main">
      <span>{props.number}</span>
    </div>
  );
};
