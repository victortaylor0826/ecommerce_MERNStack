let mongooseObj = require("mongoose");

let schemaObj = mongooseObj.Schema;

mongooseObj.connect("mongodb://127.0.0.1/mernstack12");

let reviewSchema = new mongooseObj.Schema(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    rating: { type: Number, required: true },
    userName: { type: String, required: true },
    date: { type: String, required: true },
    review: { type: String },
  },
  {
    versionKey: false,
  }
);

let reviewModel = mongooseObj.model("review", reviewSchema);

module.exports = reviewModel;
