let mongooseObj = require("mongoose"), //importing the mongoose module object
  schemaObj = mongooseObj.Schema; //using the schema class from mongoose

//creates db with name mernstack8 or opens a connection if already present
mongooseObj.connect("mongodb://127.0.0.1/mernstack12");

let ProductSchema = new schemaObj(
  {
    productName: { type: String, required: true },
    productPrice: { type: String, required: true },
    productDesc: String,
    productRating: Number,
  },
  {
    versionKey: false, //false - set to false then it wont create in mongodb
  }
);

let ProductModel = mongooseObj.model("product", ProductSchema); //user - collection name, pluralised by mongodb

module.exports = ProductModel; //this should be used in userRouter to build user api's
