let mongooseObj = require("mongoose"), //importing the mongoose module object
schemaObj = mongooseObj.Schema; //using the schema class from mongoose

//creates db with name mernstack8 or opens a connection if already present
mongooseObj.connect("mongodb://127.0.0.1/mernstack12"); 

let userSchema = new schemaObj({
    userName : {type: String, required : true},
    password: {type:String, required:true},
    street: String,
    mobile: Number
},
{
    versionKey: false //false - set to false then it wont create in mongodb
});

let UserModel = mongooseObj.model("user",userSchema);//user - collection name, pluralised by mongodb

module.exports = UserModel;//this should be used in userRouter to build user api's