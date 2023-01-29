const express = require("express");

const reviewRouter = express.Router({});

const reviewModel = require("../data-models/reviewModel");

reviewRouter.post("/api/addReview", (req, res) => {
  console.log("req from addReview", req.body);
  let revieModelObj = new reviewModel(req.body.review);
  revieModelObj.save((err, data) => {
    if (err) {
      console.log("err while adding a review", err);
      res.send(err);
    } else {
      console.log("review added successfully");
      res.send(data);
    }
  });
});

reviewRouter.get("/api/getReviewsByProductId/:productId", (req, res) => {
  let productId = req.params.productId;
  reviewModel.find({ productId: productId }, (err, data) => {
    if (err) {
      console.log("err while fetching reviews", err);
      res.send(err);
    } else {
      console.log("review fetched", data);
      res.send(data);
    }
  });
});

module.exports = reviewRouter;
