import React from "react";
import "./ItemDetails.css";
import img from "../../images/iphone.jpeg";
import { useNavigate } from "react-router-dom";

export const ItemDetails = (props) => {
  let navigate = useNavigate();
  let productId = props.elem._id;
  const handleReview = () => {
    navigate(`/addReview/${productId}`);
  };
  return (
    <div className="items_main">
      <div className="item_image">
        <img style={{ width: "100px", height: "100px" }} src={img}></img>
      </div>
      <div className="item_detail">
        <span>{props.elem.productName}</span>
        <span className="item_quantity text-muted">Qty: {props.elem.qty}</span>
        <span className="text-muted">How did you like it?</span>
        <button style={{ backgroundColor: "grey" }} onClick={handleReview}>
          Review
        </button>
      </div>
    </div>
  );
};
