import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrderToDb } from "../../State/RecentOrders/orderAction";
import { CouponComponent } from "../Coupon/CouponComponent";
import { OrderComponent } from "../RecentOrders/OrderComponent";
import * as orderTypes from "../../State/orderTypes";
import { clearCart, removeCartFromDb } from "../../State/Cart/CartAction";
import { addNotification } from "../../State/Notification/notificationActions";

export const Payment = (props) => {
  const [isValid, setIsValid] = useState(false);
  const [total, setTotal] = useState(props.amount);
  let discountedAmount = 0;
  let orderDispatch = useDispatch();
  let cartDispatcher = useDispatch();
  let cart = useSelector((state) => state.cartReducer);
  let user = useSelector((state) => state.userReducer);
  let notificationDispatcher = useDispatch();

  useEffect(() => {
    if (isValid) {
      setTotal(props.amount - 10);
    }
    console.log(cart);
  }, [isValid]);

  const addToRecentOrders = () => {
    let orderObj = {
      userId: user.userDetail._id,
      cart: cart.items,
      dateTime: new Date(),
      status: orderTypes.ORDER_PROCESSING,
    };
    orderDispatch(addOrderToDb(orderObj));
    notificationDispatcher(
      addNotification({
        userId: user.userDetail._id,
        title: "Your payment was processed",
        seen: false,
      })
    );
    cartDispatcher(removeCartFromDb(user.userDetail._id));
  };
  return (
    <div>
      <h3> Total Amount: {props.amount}</h3>
      <CouponComponent setIsValid={setIsValid} />
      <hr></hr>
      <h2>Net Total: {total}</h2>
      <button onClick={addToRecentOrders} style={{ backgroundColor: "green" }}>
        MakePayment{" "}
      </button>
      <hr></hr>
      <OrderComponent />
    </div>
  );
};
