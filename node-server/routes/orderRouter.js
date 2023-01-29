const express = require("express");
let orderRouter = express.Router({});

const orderModel = require("../data-models/orderDataModel");

orderRouter.post("/api/saveToDb", (req, res) => {
  orderModel.findOne({ userId: req.body.userId }, (err, orderDbObj) => {
    if (err) {
      console.log("Error while fetching user's order", err);
      res.send("Error while fetching user's order");
    } else {
      console.log("No recent orders found");
      let orderDataObj = new orderModel(req.body);
      orderDataObj.save((err, data) => {
        if (err) {
          console.log("err while saving order from server", err);
        } else {
          console.log("order Saved");
          res.send(data);
        }
      });
    }
  });
});

orderRouter.post("/api/fetchOrder", (req, res) => {
  orderModel.find({ userId: req.body.userId }, (err, data) => {
    if (err) {
      console.log("err while fetching order in router", err);
    } else {
      console.log("order fetched", data);
      res.send(data);
    }
  });
});

orderRouter.post("/api/cancelOrder", (req, res) => {
  orderModel.findOneAndUpdate(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    //TODO: schedule a refund over here!!
    (err, data) => {
      if (err) {
        console.log("err while fetching order in router", err);
      } else {
        console.log("order after update", data);
        res.send(data);
      }
    }
  );
});

orderRouter.post("/api/deleteOrder", (req, res) => {
  orderModel.findOneAndDelete({ _id: req.body.orderId }, (err, data) => {
    if (err) {
      console.log("err while deleting order in router", err);
    } else {
      console.log("order after update", data);
      res.send(data);
    }
  });
});

module.exports = orderRouter;
