import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./CustomerReview.css";
import img from "../../images/iphone.jpeg";
import { addReviewToDb } from "../../State/Review/reviewAction";
import { useNavigate, useParams } from "react-router-dom";
import { Stars } from "../../Common/Stars/Stars";
import { fetchProductsById } from "../../State/Product/productAction";
import { addNotification } from "../../State/Notification/notificationActions";

export const CustomerReview = (props) => {
  const [ranking, setRanking] = useState(0);
  const [review, setReview] = useState("");

  let navigate = useNavigate();
  let [fill, setFill] = useState(false);

  let user = useSelector((state) => state.userReducer);
  let product = useSelector((state) => state.productReducer);
  let params = useParams();
  let productId = params["productId"] ? params["productId"] : "no params";
  let reviewDispatcher = useDispatch();
  let productDispatcher = useDispatch();
  let notificationDispatcher = useDispatch();

  useEffect(() => {
    productDispatcher(fetchProductsById(productId));
  }, []);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    reviewDispatcher(
      addReviewToDb({
        userId: user.userDetail._id,
        productId,
        rating: ranking,
        userName: user.userDetail.userName,
        date: new Date().toLocaleString(),
        review,
      })
    );
    notificationDispatcher(
      addNotification({
        userId: user.userDetail._id,
        title: "You left a review",
        seen: false,
      })
    );
    navigate(`/review/${productId}`);
  };
  return (
    <div className="customerReview_main">
      <h2>Your Reviews Are Important</h2>
      <div className="image_holder">
        <img className="img_product" src={img}></img>
      </div>
      <h4>{product.products.productName}</h4>
      {ranking}
      <div className="stars_holder">
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <div onClick={() => setRanking(index + 1)} key={index}>
              {index < ranking ? (fill = true) : (fill = false)}
              <Stars fill={fill} />
            </div>
          );
        })}
      </div>
      <div className="review_text">
        <form onSubmit={handleReviewSubmit}>
          <div className="form-group">
            <label className="text-muted">
              How did you like the product? Please leave a review
            </label>
            <br></br>
            <textarea
              onChange={(e) => setReview(e.target.value)}
              className="from-control input_text"
              type={"text"}
            />
          </div>
          <input type="submit"></input>
        </form>
      </div>
    </div>
  );
};
