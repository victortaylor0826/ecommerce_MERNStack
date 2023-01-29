import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DetailedProduct from "./DetailedProduct";
import { fetchProdcuts } from "../../State/Product/productAction";
import "./ProductList.css";

export default function ProductList() {
  let dispatchToDb = useDispatch();
  let products = useSelector((state) => state.productReducer.products);

  useEffect(() => {
    dispatchToDb(fetchProdcuts());
  }, []);

  return (
    <div className="productlist_container">
      <div className="hidden_sidebar"></div>
      <div className="product_options">
        <h3>Product List</h3>
        <div>
          <span className="text-muted">Filter</span>
        </div>
      </div>

      <div className="productlist_main">
        {products && products.length > 0
          ? products.map((elem, key) => {
              return (
                <div className="productlist_item" key={key}>
                  <DetailedProduct products={elem} />
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}
