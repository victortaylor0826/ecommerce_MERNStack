import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../State/Cart/CartAction";
import "./Cart.css";
import { CartDetail } from "./CartDetail";
import { addToDB, getUserCart } from "../../State/Cart/CartAction";
import { NavLink, useNavigate } from "react-router-dom";
import { addNotification } from "../../State/Notification/notificationActions";

export const Cart = (props) => {
  let products = useSelector((state) => state.cartReducer);
  let cart = products;
  products = products.items;
  let amount = 0;
  let clearMyCart = useDispatch();
  let dispatchCartToDb = useDispatch();
  let dispatchGetUsercart = useDispatch();
  let notificationDispatcher = useDispatch();
  let user = useSelector((state) => state.userReducer);

  let navigate = useNavigate();

  useEffect(() => {
    dispatchGetUsercart(getUserCart(user.userDetail._id));
    amount = updateData();
  }, []);

  let updateData = () => {
    products.map((item) => {
      amount = amount + item.qty * item.productPrice;
    });

    return amount.toFixed(2);
  };

  let addCartToDB = (cart, userId) => {
    if (!userId) {
      alert("Please login to save the cart!!");
    } else {
      dispatchCartToDb(addToDB(cart, userId));
    }
  };
  let saveForCheckOut = (cart, userId) => {
    addCartToDB(cart, userId);
    navigate("/checkout", { state: { amount: amount } });
  };

  let flushCart = () => {
    clearMyCart(clearCart());
  };

  return (
    <div className="cart_container">
      <div className="cart_main">
        <div className="cart-notification-bar">
          <div className="notification-bar-header">
            {" "}
            <b>
              {user.userDetail ? user.userDetail.userName : "default"}'s Cart!!
            </b>
            {props.readonly ? (
              ""
            ) : (
              <>
                <button
                  onClick={() => addCartToDB(cart, user.userDetail._id)}
                  className="cart_saveToDb"
                >
                  Save Cart
                </button>
              </>
            )}
          </div>
        </div>
        <div className="compoment-main">
          {products && products.length > 0
            ? products.map((el, key) => {
                console.log("from the cart", el);
                return (
                  <div className="card" key={key}>
                    <div className="cart_item">
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span>
                          <b style={{ fontWeight: "500" }}>{el.productName}</b>
                        </span>
                        <span>{el.productDesc}</span>
                        <span>
                          Ratings:{" "}
                          <span className="product_rating">
                            {el.productRating}
                          </span>
                        </span>
                        <span>Price: ${el.productPrice}</span>
                      </div>
                      {props.readonly ? (
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span>Quantitiy: {el.qty}</span>
                          <span>Amount: {el.qty * el.productPrice}</span>
                        </div>
                      ) : (
                        <CartDetail item={el} />
                      )}
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
        <div className="cart_summary">
          <h3 style={{ borderBottom: "1px solid grey", paddingBottom: "0px" }}>
            Cart Summary
          </h3>

          <h3>Total: {updateData()} </h3>
        </div>
        <hr></hr>
        {props.readonly ? (
          ""
        ) : (
          <>
            <button onClick={() => flushCart()} className="cart_clear">
              Clear Cart
            </button>
            <button
              onClick={() => saveForCheckOut(cart, user.userDetail._id)}
              className="cart_checkout button"
            >
              CheckOut
            </button>
            {/* <NavLink
            onClick={() => addCartToDB(cart, user.userDetail._id)}
            to={"/checkout"}
            state={{ amount: amount }}
            activeclassname="success"
            className="cart_checkout button"
          >
            CheckOut
          </NavLink> */}
          </>
        )}
      </div>
    </div>
  );
};
