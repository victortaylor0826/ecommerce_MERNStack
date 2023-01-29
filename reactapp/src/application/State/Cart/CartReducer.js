import * as actionTypes from "../actionTypes";

const initialState = {
  items: [],
};

let cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CART_ADDITEM:
      console.log("adding item to cart", action.payload);
      let temp = state.items.filter((elem) => elem._id != action.payload._id);
      return !action.payload["qty"]
        ? { items: [...temp, { ...action.payload, qty: 1 }] }
        : { items: [...temp, action.payload] };

    case actionTypes.CART_CLEAR:
      return { items: [] };

    case actionTypes.CART_REMOVEITEM:
      let currState = state.items.filter((el) => el._id != action.payload);
      console.log("Cart removeItem", currState);
      return { items: currState };

    case actionTypes.CART_UPDATEITEM:
      let items = state.items.map((item) => {
        if (item._id == action.payload.id) {
          return { ...item, qty: parseInt(action.payload.qty) };
        }
        return { ...item };
      });
      return { items: items };
    default:
      return state;
  }
};

export default cartReducer;
