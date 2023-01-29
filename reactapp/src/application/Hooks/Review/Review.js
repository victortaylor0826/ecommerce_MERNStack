import React, { useEffect } from "react";
import "./Review.css";
import img from "../../images/iphone.jpeg";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsById } from "../../State/Product/productAction";
import { getReviewsByProductId } from "../../State/Review/reviewAction";

export const Review = () => {
  let product = useSelector((state) => state.productReducer);
  let reviews = useSelector((state) => state.reviewReducer);
  let params = useParams();
  let productId = params["productId"];
  let productDispatcher = useDispatch();
  let reviewDispatcher = useDispatch();

  useEffect(() => {
    productDispatcher(fetchProductsById(productId));
    reviewDispatcher(getReviewsByProductId(productId));
  }, []);
  return (
    <div className="review_main">
      <div className="review_img_holder">
        <img className="review_image" src={img} alt="product_image"></img>
      </div>
      <div className="review_container">
        <h3>{product.products.productName}</h3>
      </div>
      <div className="reviews_box">
        {reviews.length > 0 ? (
          reviews.map((elem, key) => {
            return (
              <div className="reviews_holder" key={key}>
                <div>
                  {elem.review} <span>Given By: {elem.userName}</span>{" "}
                </div>
              </div>
            );
          })
        ) : (
          <h3>Sorry!! No Reviews Yet</h3>
        )}
      </div>
    </div>
  );
};
