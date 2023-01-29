import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { logUserOut } from "../../State/User/UserAction";
import { clearCart } from "../../State/Cart/CartAction";
import { clearRecentOrders } from "../../State/RecentOrders/orderAction";
import "./HeaderComponent.css";
import { Notification } from "../../Hooks/Notification/Notification";
import { UserInfo } from "../UserInfo/UserInfo";
import { Descriptor } from "../Descriptor/Descriptor";
import { NContainer } from "../NotificationContainer/NContainer";
import { fetchNotifications } from "../../State/Notification/notificationActions";

let Header = (props) => {
  let navigate = useNavigate(); //this is called a useNavigate hook to navigate user on other page
  let user = useSelector((state) => state.userReducer);
  let cart = useSelector((state) => state.cartReducer);
  let notifications = useSelector((state) => state.notificationReducer);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  let func = function (event, to) {
    event.preventDefault();
    navigate(to);
  };

  let userDispatch = useDispatch();
  let cartDispatcher = useDispatch();
  let orderDispatcher = useDispatch();
  let notificationDispatcher = useDispatch();

  const handleLogOut = (e) => {
    e.preventDefault();
    userDispatch(logUserOut());
    cartDispatcher(clearCart());
    orderDispatcher(clearRecentOrders());
    navigate("/user");
  };

  const getUnseenNotification = (notifications) => {
    return notifications.filter((el) => !el.seen).length;
  };
  useEffect(() => {
    if (user.userDetail) {
      notificationDispatcher(fetchNotifications(user.userDetail._id));
    }
  }, []);

  let User = props.User;
  return (
    <>
      <div className="hidden_header"></div>
      <div className="header_main">
        <div>
          Hi, <b> {User.userDetail ? User.userDetail.userName : ""} </b>
        </div>
        <div className="header_links">
          <NavLink
            to="/home"
            className="navlink_button"
            activeclassname="success"
          >
            Home{" "}
          </NavLink>
          <NavLink
            to="/about"
            className="navlink_button"
            activeclassname="success"
          >
            About{" "}
          </NavLink>
          {user.loggedIn ? (
            <div className="header_userBtn">
              <NavLink
                to="/productList"
                className="navlink_button"
                activeclassname="success"
              >
                Shop
              </NavLink>

              <NavLink
                to="/order"
                className="navlink_button"
                activeclassname="success"
              >
                Orders
              </NavLink>
              <div className="header_noticart_container">
                <div className="header_cart">
                  <NavLink
                    to="/cart"
                    className="cart_link"
                    activeclassname="success"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="blue"
                      viewBox="0 -3 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="cart_svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>

                    {cart.items.length > 0 ? (
                      <Notification number={cart.items.length} />
                    ) : (
                      ""
                    )}
                  </NavLink>
                </div>

                <div
                  onClick={() => setShowNotification(!showNotification)}
                  className="header_notification"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="red"
                    viewBox="0 0 25 25"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="notification_svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                    />
                  </svg>
                  {getUnseenNotification(notifications) > 0 ? (
                    <Notification
                      number={getUnseenNotification(notifications)}
                    />
                  ) : (
                    ""
                  )}
                  {showNotification ? <NContainer /> : ""}
                </div>
              </div>

              <div
                onClick={() => setShowUserOptions(!showUserOptions)}
                className="header-user-options"
                onMouseOver={() => setShowDescription(!showDescription)}
                onMouseDown={() => setShowDescription(!showDescription)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="green"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="user_svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {showDescription ? <Descriptor title={"user"} /> : ""}
                {showUserOptions ? <UserInfo userLogout={handleLogOut} /> : ""}
              </div>
            </div>
          ) : (
            <NavLink
              to="/user"
              className="navlink_button"
              activeclassname="success"
            >
              Login{" "}
            </NavLink>
          )}
          {user.isAdmin ? (
            <>
              <NavLink
                to="/product"
                className="navlink_button"
                activeclassname="success"
              >
                Product
              </NavLink>
              <NavLink
                to="/admin"
                className="navlink_button"
                activeclassname="success"
              >
                Admin
              </NavLink>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

// Header.defaultProps = {
//     headerTitle : "Header Default Component"
// }

Header.propTypes = {
  headerTitle: PropTypes.string.isRequired,
};

//to subscribe from the store
let mapStateToProps = (state) => {
  return {
    User: state.userReducer,
  };
};

//export default Header;

export default connect(mapStateToProps, null)(Header);
