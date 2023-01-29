const express = require("express");
const { register, login, getUser } = require("../controllers/authController");
const userRouter = express.Router({}); //options for router can be put in
const userDataModel = require("../data-models/userDataModel");
const auth = require("../middlewares/auth");

//api to signin and signup user
// userRouter.post("/api/signinup", (req, res) => {
//   console.log(req.body); //this will be sent from useraction file to make server call

//   userDataModel.findOne(
//     { userName: req.body.userName, password: req.body.password },
//     (err, userData) => {
//       if (err) {
//         console.log(err);
//         res.send("Error in fetching user!!");
//       } else if (userData) {
//         //get one user means its already present so return as it is userInfo - signin
//         //match password or allow oauth or two factor
//         res.send(userData);
//       } else {
//         //this is the new user so we need to create mongodb object and save it - signup

//         let userDataModelObj = new userDataModel(req.body);

//         userDataModelObj.save((errr, newUser) => {
//           //signup
//           //newUser will containe _id from mongodb created by default
//           if (errr) {
//             console.log("errr ", errr);
//             res.send("Error Occured while creating user entry");
//           } else {
//             console.log("newUser ", newUser);
//             res.send(newUser);
//           }
//         });
//       }
//     }
//   );
// });

// userRouter.get("/savedummy", (req, res) => {
//   //let name = req.query["userName"];
//   console.log("Save Dummy is invoked");
//   //mongoose data object - this will allow us to make calls with mongodb server
//   //let userMongooseObject = new userDataModel({userName: name});

//   let userMongooseObject = new userDataModel(req.query);

//   //this will use save method to save user data and return us the error first callback
//   userMongooseObject.save((err, data) => {
//     if (err) {
//       console.log(err);
//       res.send("User save has error!1");
//     } else {
//       console.log(data);
//       res.send(data);
//     }
//   });
// });

userRouter.post("/api/register", register);
userRouter.post("/api/login", login);
userRouter.get("/api/getUser", auth, getUser);
module.exports = userRouter;
