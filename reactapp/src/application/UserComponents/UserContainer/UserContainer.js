import User from "../UserComponent/UserComponent";
import { connect } from "react-redux";
import { AddUser, signInSignUpUser } from "../../State/User/UserAction";

//to subscribe from the store
let mapStateToProps = (state) => {
  return {
    User: state.userReducer,
  };
};

//publish to the store - using given action
let mapDispatchToProps = (dispatch) => {
  return {
    AddUserToStore: (user) => {
      dispatch(AddUser(user));
    },
    SaveUserToDB: (user) => {
      dispatch(signUpUser(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
