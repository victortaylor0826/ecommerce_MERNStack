import React, { useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  addProductToDb,
  fetchProdcuts,
} from "../../State/Product/productAction";

import ProductList from "./ProductList";
import "./Product.css";

// Create a form to allow user to submit Product Details - name, price, desc, rating
const Product = () => {
  let productName = useRef(null);
  let productPrice = useRef(null);
  let productDesc = useRef(null);
  let productRating = useRef(null);

  let product = useSelector((state) => state.productReducer);
  let dispatchToDb = useDispatch();

  useEffect(() => {
    productName.current.value = product.defaultProduct.productName;
    productPrice.current.value = product.defaultProduct.productPrice;
    productDesc.current.value = product.defaultProduct.productDesc;
    productRating.current.value = product.defaultProduct.productRating;
    dispatchToDb(fetchProdcuts());
  }, []);

  let addProductTo_Db = (e) => {
    let stdObj = {
      productName: productName.current.value,
      productPrice: productPrice.current.value,
      productDesc: productDesc.current.value,
      productRating: productRating.current.value,
    };

    dispatchToDb(addProductToDb(stdObj));
  };
  return (
    <div className="product_main col-md-12">
      <div className="product_form_detail col-md-6">
        <h1>Product Form</h1>
        <Form className="col-md-12 todo-form">
          <Form.Group>
            <Form.Label>Product Name: </Form.Label>
            <Form.Control type="text" ref={productName}></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label> Product Price: </Form.Label>

            <Form.Control type="number" ref={productPrice}></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Product Desc: </Form.Label>
            <Form.Control type="text" ref={productDesc}></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Product Ratings: </Form.Label>
            <Form.Control type="number" ref={productRating}></Form.Control>
          </Form.Group>
        </Form>
        <div className="todo-buttons col-md-6">
          <Button variant="success" onClick={addProductTo_Db}>
            Submit
          </Button>
          <Button variant="danger">Clear</Button>
        </div>
      </div>
      <div className="product_cart col-md-6">
        {" "}
        <ProductList />
      </div>
    </div>
  );
};

export default Product;
