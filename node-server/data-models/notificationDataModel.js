let mongooseObj = require("mongoose"), //importing the mongoose module object
  schemaObj = mongooseObj.Schema; //using the schema class from mongoose

//creates db with name mernstack8 or opens a connection if already present
mongooseObj.connect("mongodb://127.0.0.1/mernstack12");

let notificationSchema = new schemaObj(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    seen: { type: Boolean, required: true },
    identifier: { type: String },
  },
  {
    versionKey: false, //false - set to false then it wont create in mongodb
  }
);

let NotificationModel = mongooseObj.model("notification", notificationSchema); //cart - collection name, pluralised by mongodb

module.exports = NotificationModel; //this should be used in userRouter to build user api's
