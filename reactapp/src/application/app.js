import React, { Component, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Redirect,
  Route,
} from "react-router-dom"; // browser router from react

import "./app.css"; //css and style loaders are present in webpack config so we can use it here

import Header from "./Common/Header/HeaderComponent";
import Footer from "./Common/Footer/FooterComponent";
import Home from "./Common/HomeComponent";
import About from "./Common/AboutComponent";
import NotFound from "./Common/NotFoundComponent";
//import User from "./AppComponents/UserComponent/UserComponent";
import User from "./UserComponents/UserContainer/UserContainer";
import UserHook from "./UserComponents/UserComponent/UserHooks";
import UsingHooks from "./Hooks/UnderstandingHooks";
import Product from "./Hooks/Products/Product";
import { Checkout } from "./Hooks/Checkout/Checkout";
import { Cart } from "./Hooks/Cart/Cart";
import ProductList from "./Hooks/Products/ProductList";
import { OrderComponent } from "./Hooks/RecentOrders/OrderComponent";
import { Review } from "./Hooks/Review/Review";
import { CustomerReview } from "./Hooks/Review/CustomerReview";

export default class ApplicationComponent extends Component {
  constructor(props, context) {
    super();

    this.state = {
      title: "Home Page Of Application",
      counter: 1,
      headerTitle: "Welcome to SynergisticIT Shopping Cart",
    };
  }

  render() {
    console.log("Application Render!!");
    let myName = "What's in the Name";
    let address = "Somewhere on earth";
    let val1 = 2,
      val2 = 5; //state and props
    //JSX - Javascript Like XML
    return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Header headerTitle={this.state.headerTitle} />
          {/* Here we'll use switch based conditions to render one component at a time */}
          <Routes>
            <Route path="/" element={<Home title={this.state.title} />} />
            <Route path="/home" element={<Home title="Home Component" />} />
            <Route path="/user" element={<UserHook />} />
            <Route path="/hooks" element={<UsingHooks name={"Mehejabeen"} />} />
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<OrderComponent />} />
            <Route path="/productList" element={<ProductList />} />
            <Route path="/about/:id" element={<About />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/review/:productId" element={<Review />} />
            <Route path="/addReview/:productId" element={<CustomerReview />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        <Footer address1={address} />
      </Router>
    );
  }
}
