import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Cart.css";
import { removeItem, updateCart } from "../../State/Cart/CartAction";

export const CartDetail = (props) => {
  const [qty, setQty] = useState(props.item.qty);
  let dispatchToUpdate = useDispatch();

  let handleRemove = (id) => {
    dispatchToUpdate(removeItem(id));
  };

  let updateQty = (e) => {
    e.preventDefault();
    setQty(e.target.value);
    let temp = { id: props.item._id, qty: e.target.value };
    dispatchToUpdate(updateCart(temp));
  };
  return (
    <div className="cartDetail_main">
      Quantity:
      <br />
      <input
        type={"Number"}
        style={{ width: "25%", textAlign: "center" }}
        onChange={updateQty}
        value={props.item.qty}
      ></input>
      <span>
        <p>
          <b>Amount</b>:{}
        </p>
        {(props.item.productPrice * qty).toFixed(2)}
      </span>
      <button
        style={{ backgroundColor: "red" }}
        onClick={() => handleRemove(props.item._id)}
      >
        RemoveItem
      </button>
    </div>
  );
};
