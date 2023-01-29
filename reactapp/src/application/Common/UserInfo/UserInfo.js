import React, { useState } from "react";
import { Descriptor } from "../Descriptor/Descriptor";
import "./UserInfo.css";
import "../NotificationContainer/NContainer.css";

export const UserInfo = (props) => {
  const handleLogOut = props.userLogout;

  return (
    <div className="userInfo_main  ">
      UserInfo
      <hr></hr>
      <div className="button_logout">
        <span className="horizontal_line"></span>
        <button className="btn_logout" onClick={handleLogOut}>
          LogOut
        </button>
      </div>
    </div>
  );
};
