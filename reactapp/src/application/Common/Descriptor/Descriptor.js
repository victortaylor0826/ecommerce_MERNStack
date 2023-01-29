import React from "react";

export const Descriptor = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        height: "30px",
        padding: " 3px 5px",
        backgroundColor: "black",
        color: "white",
        top: "115%",
        borderRadius: "25px",
        opacity: ".4",
        width: "50px",
        textAlign: "center",
        fontWeight: "100",
      }}
    >
      {props.title}
    </div>
  );
};
