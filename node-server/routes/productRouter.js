const express = require("express");
const productRouter = express.Router({}); //options for router can be put in
const productDataModel = require("../data-models/productDataModel");

////test the main root
productRouter.get("/api/getProducts", (req, res) => {
  console.log("hello from get method"); //this will be sent from useraction file to make server call

  productDataModel.find((err, products) => {
    if (err) {
      console.log(err);
      res.send("Caught in the mud dude!", err);
    } else {
      res.send(products);
    }
  });
});

//api to create a new todo
productRouter.post("/api/addProduct", (req, res) => {
  console.log(req.body); //this will be sent from useraction file to make server call
  let productDataObj = new productDataModel(req.body);
  productDataObj.save((err, newProduct) => {
    if (err) {
      console.log("hey Man common!! You have an err", err);
    } else {
      console.log("well done bud!!", newProduct);
      res.send(newProduct);
    }
  });
});

productRouter.get("/api/fetchProductById/:productId", (req, res) => {
  productDataModel.findById({ _id: req.params.productId }, (err, data) => {
    if (err) {
      console.log("Error while fetching product", err);
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

module.exports = productRouter;
