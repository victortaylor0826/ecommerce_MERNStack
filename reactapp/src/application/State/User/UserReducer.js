import * as actionType from "../actionTypes";

const InitialState = {
  userDetail: localStorage.getItem("state")
    ? JSON.parse(localStorage.getItem("state")).userDetail
    : null,
  loggedIn: localStorage.getItem("state") ? true : false,
  isAdmin: false,
};

//create a reducer

let UserReducer = (state = InitialState, action) => {
  console.log("User Reducer", action);
  switch (action.type) {
    case actionType.USER_ADDUSER:
      let temp;
      if (action.payload.userName === "Admin") {
        temp = { userDetail: action.payload, loggedIn: true, isAdmin: true };
      } else
        temp = { isAdmin: false, userDetail: action.payload, loggedIn: true };
      let userState = JSON.stringify(temp);
      localStorage.setItem("state", userState);
      return temp; //on the basis of action type being passed a new state is retruned
    case actionType.USER_LOGIN:
      let isAdmin = false;
      if (
        JSON.parse(localStorage.getItem("state")).userDetail.userName ===
        "Admin"
      ) {
        isAdmin = true;
      } else {
        //TODO: Search the datbase and find if we can get a user
        //if not display sorry no user found please try again.
      }
      return {
        userDetail: JSON.parse(localStorage.getItem("state").userDetail),
        loggedIn: true,
        isAdmin,
      };
    case actionType.USER_LOGOUT:
      localStorage.removeItem("state");
      return { userDetail: null, loggedIn: false, isAdmin: false };
    default:
      return state;
  }
};

export default UserReducer;

//How does reducers work: Concept
//1. We define a reducer with initial state and a reducer function.
//2. then we create an action that carries a type and a paylaod
//3. Then useDispatch is called which takes a reducer as an argument.
//4. for exam useDispatch(userReducer(takes an action))
//5. definition: reducer(state, action) execution: => passed as reducer(action)
