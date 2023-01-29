import * as actionType from "../actionTypes";

const InitialState = {
  products: [],
  defaultProduct: {
    productName: "Iphone",
    productPrice: "22.33",
    productDesc: "Nice product",
    productRating: "3.2",
  },
};

//create a reducer

let productReducer = (state = InitialState, action) => {
  console.log("product Reducer", action);
  switch (action.type) {
    case actionType.PRODUCT_ADDPRODUCT:
      return { ...state, products: action.payload.product }; //on the basis of action type being passed a new state is retruned
    default:
      return state;
  }
};

export default productReducer;
