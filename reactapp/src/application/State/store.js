//import reducers, create/configures store, import middle ware to make calls, combineReducer, export store
//only one store is allowed in one applicaiton, applications data model,
//one reducer per store so we need to combine if multilpe reducers are there
//store sends notification to view for change of state
//this allows to inject middlewares like thunk, promise in application

import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk"; //is used to pipeline the dispatched objects and give us a feeling of sync execution by being async

import userReducer from "./User/UserReducer";
import productReducer from "./Product/productReducer";
import cartReducer from "./Cart/CartReducer";
import { couponReducer } from "./Coupon/couponReducer";
import { orderReducer } from "./RecentOrders/orderReducer";
import { notificationReducer } from "./Notification/notificationReducer";
import { reviewReducer } from "./Review/reviewReducer";

//custom middleware function to log action raised
const logger = () => (next) => (action) => {
  //currying in javasript where we pass function as input and recieve function as output
  console.log("Logged Action : Store File ", action);
  next(action); //move to the actual execution
};

const rootReducer = combineReducers({
  userReducer, //userReducer : userReducer,
  productReducer,
  cartReducer,
  couponReducer,
  orderReducer,
  notificationReducer,
  reviewReducer,
});
//store.userReducer.UserName

//create configure and export the store from this code
export default configureStore(
  { reducer: rootReducer },
  {}, //inital state if we want to set from store instead of reducer
  applyMiddleware(logger, thunk)
);
