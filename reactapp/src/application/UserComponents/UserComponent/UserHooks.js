//Class and Functional Component - State with Class but Functional was not, it became static

import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux"; //inplace of connect and mapStateToProps or mapDispatchToProps we have these
import { useNavigate } from "react-router-dom";
import { loginUser, signUpUser } from "../../State/User/UserAction";
import "./UserHook.css";

let UserHook = (props) => {
  //by using useRef we can create reference for html elements to be updated without adding state change
  //let refInput = react.createRef()
  // creating inputs with the help of ref keyword with userRef function
  let inputUserName = useRef(null);
  let inputPassword = useRef(null);
  let inputMobile = useRef(null);
  let inputStreet = useRef(null);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  //useSelector allows to subscribe from store (here reading user data)
  let user = useSelector((state) => state.userReducer); //replaces the mapStateToProps

  // we can't do it as rendering is not done yet so no access to html element
  //inputUserName.current.value = user.userName;

  //this hook will be used to dispatch the action (signinupuser)
  let dispatchToSignIn = useDispatch(); //in place of mapDispatchToProps

  //useeffect is the hook that we use to make it work as componentDidMount, componentWillUnmount
  useEffect(() => {
    //code to initialize any server call or data-set
    inputUserName.current.value = user.userName ? user.userName : "";
    inputPassword.current.value = user.password ? user.password : "";
    inputStreet.current.value = user.street ? user.street : "";
    inputMobile.current.value = user.mobile ? user.street : "";

    // return ()=>{ //this we'll do to make it work like component will unmount
    //     //doing clearInterval, unsubscribe to any post request etc
    // }
  });

  let readFormData = (evt) => {
    // `current` points to the mounted text input element
    let userObj = {
      userName: inputUserName.current.value,
      password: inputPassword.current.value,
      street: inputStreet.current.value,
      mobile: inputMobile.current.value,
    };
    //alert("User To Sign In :" + JSON.stringify(userObj))

    dispatchToSignIn(signUpUser(userObj));

    if (user) {
      console.log("From login", user);
      navigate("/productList");
    }
    console.log("from userDispatch", user);
    evt.preventDefault();
  };

  const handleLogIn = () => {
    dispatchToSignIn(loginUser({ userName, password }));
  };

  return (
    <div className="user_container">
      <div className="user_main">
        <h1>User</h1>
        <div className="user_signin_signup">
          <form className={"form userHook"} onSubmit={readFormData}>
            <label>
              <span>
                User Name<span className="required">*</span>{" "}
              </span>
              <input
                type="text"
                className={"form-control "}
                ref={inputUserName}
                placeholder="Please enter user name"
                maxLength={20}
                required
              />
            </label>
            <br />
            <label>
              <span>
                Password<span className="required">*</span>
              </span>
              <input
                type="password"
                className={"form-control "}
                ref={inputPassword}
                placeholder="Please enter password"
                maxLength={20}
                required
              />
            </label>
            <br />

            <label>
              <span>
                Street<span className="required">*</span>{" "}
              </span>
              <input
                type="text"
                className={"form-control "}
                ref={inputStreet}
                placeholder="Please enter address"
                maxLength={20}
              />
            </label>
            <br />
            <label>
              <span>
                Mobile<span className="required">*</span>{" "}
              </span>
              <input
                type="number"
                className={"form-control "}
                ref={inputMobile}
                placeholder="Please enter mobile"
              />
            </label>

            <br />
            <input type="submit" className={"btn btn-primary"} value="SignUp" />
          </form>
          <span className="vertical_line"></span>
          <div className="signin_signup">
            <form>
              <div className="form-group">
                <label>Username: </label>
                <input
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder={"username"}
                  className="form-control"
                  type={"text"}
                ></input>
              </div>

              <div className="form-group">
                <label>Passowrd: </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={"password"}
                  className="form-control"
                  type={"text"}
                ></input>
              </div>
            </form>
            <span className="text_muted text-muted">
              Already have an account?
              <button onClick={handleLogIn} className="loginIn_button">
                LogMe In
              </button>
            </span>

            <div className="company_logo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="company_svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHook;
