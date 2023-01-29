import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelOrder,
  deleteOrder,
  fetchOrders,
} from "../../State/RecentOrders/orderAction";
import * as orderTypes from "../../State/orderTypes";
import { reOrder } from "../../State/Cart/CartAction";
import "./OrderComponent.css";
import { ItemDetails } from "./ItemDetails";

export const OrderComponent = () => {
  let orderDispatcher = useDispatch();

  let order = useSelector((state) => state.orderReducer);
  let user = useSelector((state) => state.userReducer);
  console.log("order", order);
  var validDate;

  let getDate = (date) => {
    let convertedDate = new Date(date);
    let date_to_output =
      convertedDate.getDate() +
      "-" +
      (convertedDate.getMonth() + 1) +
      "-" +
      convertedDate.getFullYear();
    return date_to_output;
  };

  let handleOrderChange = (userId, id, status) => {
    orderDispatcher(cancelOrder(userId, id, status));
  };

  let reOrderThis = (userId, cart, id) => {
    orderDispatcher(reOrder(cart));
    orderDispatcher(deleteOrder(userId, id));
  };

  let isValidDateToCancel = (date) => {
    let dateToCheck = new Date(date);
    let todayDate = new Date();
    validDate = new Date(dateToCheck.setHours(dateToCheck.getHours() + 48));

    if (validDate.getDate() >= todayDate.getDate()) return true;
    return false;
  };

  useEffect(() => {
    orderDispatcher(fetchOrders(user.userDetail._id));
  }, []);

  return (
    <div className="order_container container">
      <h1>Thanks!! Here is your Recent Orders</h1>
      {console.log(order)}
      {order.length >= 1
        ? order.map((elem, key) => {
            return (
              <div className="order_main" key={key}>
                <div className="order_details text-muted">
                  <div>Created On: {getDate(elem.dateTime)}</div>
                  <div>Status: {elem.status}</div>
                </div>
                <div className="order_holder">
                  <div className="order_items card">
                    {elem.cart && elem.cart.length >= 1
                      ? elem.cart.map((elem, key) => {
                          return (
                            <ItemDetails elem={elem} key={key}></ItemDetails>
                          );
                        })
                      : ""}
                  </div>

                  <div className="order_options">
                    {elem.status == orderTypes.ORDER_PROCESSING &&
                    isValidDateToCancel(elem.dateTime) ? (
                      <div className="option_btn_holder">
                        <div className="text-muted">
                          Cancel Within:{validDate.toLocaleString()}
                        </div>
                        <button
                          className="cancel_btn"
                          onClick={() =>
                            handleOrderChange(
                              user.userDetail._id,
                              elem._id,
                              orderTypes.ORDER_CANCELED
                            )
                          }
                        >
                          Cancel Order
                        </button>
                        <button>Edit Order</button>
                      </div>
                    ) : (
                      <div className="option_btn_holder">
                        <button
                          className="reOrder_btn"
                          onClick={() =>
                            reOrderThis(
                              user.userDetail._id,
                              elem.cart,
                              elem._id
                            )
                          }
                        >
                          Reorder
                        </button>
                        <button style={{ backgroundColor: "red" }}>
                          Delete Order
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        : "There are no recent orders to show"}
    </div>
  );
};
