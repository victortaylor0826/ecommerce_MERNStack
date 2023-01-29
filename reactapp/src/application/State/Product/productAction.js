import * as actionType from "../actionTypes";
import axios from "axios";

export const AddProduct = (product) => {
  return {
    type: actionType.PRODUCT_ADDPRODUCT,
    payload: { product }, //this paload can be accessed in UserReducer switch
  };
};

export const addProductToDb = (product) => {
  // thunk - makes it behave synchronously
  return (dispatch) => {
    // here we go with ajax call : to save data to the server or fetch it from the server
    // using fetch method of react
    console.log("called by dispatch and synced by thunk");
    //dispatch(loading(true));
    axios
      .post(
        "http://localhost:9000/product/api/addProduct", //uri or end point of singninup api
        product //passing user object to be read as req.body
      )
      .then((ServerData) => {
        let product = ServerData.data;
        //alert(JSON.stringify(signdUser))
        //sending user to the store
        dispatch(fetchProdcuts()); //dispatching action with signed user
        //dispatch(getUserCart(signdUser._id))
      })
      .catch((err) => {
        console.log("err in login ", err);
      });
  };
};

export const fetchProdcuts = () => {
  console.log("fetching products: ");
  return function (dispatch) {
    axios
      .get("http://localhost:9000/product/api/getProducts")
      .then((response) => {
        dispatch(AddProduct(response.data));
      })
      .catch((err) => {
        console.log("You got an error", err);
      });
  };
};

export const fetchProductsById = (productId) => {
  return function (dispatch) {
    axios
      .get(`http://localhost:9000/product/api/fetchProductById/${productId}`)
      .then((serverData) => dispatch(AddProduct(serverData.data)))
      .catch((err) => console.log("err while fetching product", err));
  };
};
