import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getUserCart } from "../../State/Cart/CartAction";
import { Cart } from "../Cart/Cart";
import "./Checkout.css";
import { CheckoutDetail } from "./CheckoutDetail";
import QRCode from "react-qr-code";
import { Payment } from "../Payment/Payment";

export const Checkout = () => {
  const location = useLocation();
  const cart = useSelector((state) => state.cartReducer);
  const [isPaid, setIsPaid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    console.log(cart);
  });

  const handlePayment = () => {
    setIsPaid(true);
  };
  return (
    <div className=" checkout_main">
      <div className="col-md-12 col-12 col-lg-6 ">
        <h1>Sales summary</h1>
        <Cart readonly={true} />
        <div>
          Total: {location.state.amount > 0 ? location.state.amount : 0}
        </div>
        <div className="checkout_details">
          <CheckoutDetail submitted={setIsSubmitted} />
          {isSubmitted ? (
            <>
              {" "}
              <button
                onClick={() => handlePayment()}
                style={{ backgroundColor: "green" }}
              >
                {" "}
                Proceed To Payment
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="checkout-qrCode">
        {isPaid ? (
          <>
            <Payment
              amount={location.state.amount ? location.state.amount : 0}
            />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
