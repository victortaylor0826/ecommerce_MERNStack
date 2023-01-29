let mongooseObj = require("mongoose"), //importing the mongoose module object
  schemaObj = mongooseObj.Schema; //using the schema class from mongoose

//creates db with name mernstack8 or opens a connection if already present
mongooseObj.connect("mongodb://127.0.0.1/mernstack12");

let cartSchema = new schemaObj(
  {
    userId: { type: String, required: true },
    cart: Object,
  },
  {
    versionKey: false, //false - set to false then it wont create in mongodb
  }
);

let CartModel = mongooseObj.model("cart", cartSchema); //cart - collection name, pluralised by mongodb

module.exports = CartModel; //this should be used in userRouter to build user api's
