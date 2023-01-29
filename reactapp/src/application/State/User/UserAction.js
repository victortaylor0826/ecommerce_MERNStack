import * as actionType from "../actionTypes";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  addDefaultNotification,
  addNotification,
} from "../Notification/notificationActions";

export const AddUser = (user) => {
  return {
    type: actionType.USER_ADDUSER,
    payload: user, //this paload can be accessed in UserReducer switch
  };
};

export const logUserOut = () => {
  return {
    type: actionType.USER_LOGOUT,
    payload: [],
  };
};

let notifications = (userId) => {
  return [
    {
      userId: userId,
      title: "Welcome to 9shp Experience. Enjoy Shopping!!",
      seen: false,
      identifier: "shop",
    },
    {
      userId: userId,
      title: "Please Shop for Products!",
      seen: false,
      identifier: "shop",
    },
    {
      userId: userId,
      title: "Go to Cart to Checkout!",
      seen: false,
      identifier: "cart",
    },
    {
      userId: userId,
      title: "Find your Recent Orders!",
      seen: false,
      identifier: "order",
    },
  ];
};

export const signUpUser = (user) => {
  // thunk - makes it behave synchronously
  return (dispatch) => {
    // here we go with ajax call : to save data to the server or fetch it from the server
    // using fetch method of react
    console.log("called by dispatch and synced by thunk");
    //dispatch(loading(true));
    axios
      .post(
        "http://localhost:9000/user/api/register", //uri or end point of singninup api
        user //passing user object to be read as req.body
      )
      .then((ServerData) => {
        let token = ServerData.data.token;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .get("http://localhost:9000/user/api/getUser", config)
          .then((res) => {
            let user = res.data;
            //ntf is notification recieved after passing userId
            let ntf = notifications(user._id);

            //map through ntf to dispatch each notification to db
            ntf.map((elem) => {
              return dispatch(addNotification(elem));
            });

            dispatch(AddUser(user));
          })
          .catch((err) => console.log(err));
        //alert(JSON.stringify(signdUser))
        //sending user to the store
        //dispatch(AddUser(signdUser)); //dispatching action with signed user
        //dispatch(getUserCart(signdUser._id))
      })
      .catch((err) => {
        console.log("err creating a user ", err.response.data.msg);
      });
  };
};

export const loginUser = (user) => {
  return function (dispatch) {
    axios
      .post("http://localhost:9000/user/api/login", user)
      .then((serverData) => {
        let token = serverData.data.token;
        console.log("token", token);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .get("http://localhost:9000/user/api/getUser", config)
          .then((res) => dispatch(AddUser(res.data)))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log("err while loggin in", err));
  };
};

//How does this work?

//look an action is supposed to return an object with {type: "", payload: ""};
//but the second aciton is returning a function with dispatch return type why?
//as the console.log says it is called by dispatch

//if it is normal object the reducer will take it's properties and do it's action
//but when a function is passed than the dispatch has to do it's job

//useDispatch({type: "", {}}) or useDispatch(() => {

//})
