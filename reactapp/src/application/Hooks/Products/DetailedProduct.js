import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./DetailedProduct.css";
import { addToCart } from "../../State/Cart/CartAction";
import img from "../../images/iphone.jpeg";
import { addNotification } from "../../State/Notification/notificationActions";
import { NavLink } from "react-router-dom";

export default function DetailedProduct(products) {
  let [showDetails, setShowDetails] = useState(false);
  let dispatchToCart = useDispatch();
  let user = useSelector((state) => state.userReducer);

  let productsId = products.products._id;

  let addMeToCart = (elem) => {
    dispatchToCart(addToCart(elem));
  };

  return (
    <div className="list_main">
      <div className="list_title">{products.products.productName}</div>

      <div className="list_image" onClick={() => setShowDetails(!showDetails)}>
        <img src={img}></img>
      </div>
      <hr style={{ width: "95%" }}></hr>
      <div className="list_detail">
        <p className="text-muted">
          Price:
          <span className="product_price">
            ${products.products.productPrice}
          </span>
        </p>
        <p className="text-muted">Desc: {products.products.productDesc}</p>
        <p className="text-muted">
          Ratings:
          {"  "}
          <span style={{ color: "#AAA04" }}>
            {products.products.productRating}
          </span>
          <br></br>
          <span className="review text-muted">
            {" "}
            <NavLink to={`/review/${productsId}`}> Read Reviews</NavLink>
          </span>
        </p>
        <div className="list_btn_holder">
          <button onClick={() => addMeToCart(products.products)}>CartMe</button>
        </div>
      </div>
    </div>
  );
}
