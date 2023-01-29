const express = require("express");
let cartRouter = express.Router({});

const CartModel = require("../data-models/cartDataModel");

cartRouter.post("/api/saveToDb", (req, res) => {
  CartModel.findOne({ userId: req.body.userId }, (err, cartDbObj) => {
    if (err) {
      console.log("got error on fetching", err);
      res.send("error while fetching cart!!");
    }
    if (!cartDbObj) {
      console.log("No items found in the cart. Adding Items");

      let cartObj = new CartModel(req.body);
      cartObj.save((err, data, next) => {
        if (err) {
          console.log("err found", err);
          res.send("There was an error!" + err);
        }
        res.json(data);
      });
    } else {
      console.log("items found updating items");
      cartDbObj.cart = req.body.cart;

      cartDbObj.save((err, data, save) => {
        if (err) {
          console.log("sorry Error", err);
          res.send(err);
        }
        res.json(data);
      });
    }
  });
});

cartRouter.post("/api/getUserCart", (req, res) => {
  console.log("requested cart for", req.body);
  CartModel.findOne({ userId: req.body.userId }, (err, cart) => {
    if (err) {
      res.send("error Occured", err);
    } else {
      res.json(cart);
    }
  });
});

cartRouter.post("/api/removeCart", (req, res) => {
  console.log("removing cart for", req.body.userId);
  CartModel.findOneAndDelete({ userId: req.body.userId }, (err, data) => {
    if (err) {
      res.send("error Occured", err);
    } else {
      console.log("cart removed");
      res.json(data);
    }
  });
});
module.exports = cartRouter;
