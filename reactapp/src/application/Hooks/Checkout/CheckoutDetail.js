import { joinPaths } from "@remix-run/router";
import React, { useEffect, useRef, useState } from "react";
import "./Checkout.css";

export const CheckoutDetail = (props) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  let firstname = useRef();
  let lastname = useRef();
  let phone = useRef();
  let email = useRef();
  let address = useRef();

  useEffect(() => {
    let name = [];
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        data.map((elem) => {
          name.push(elem.name.common);
        });
        setCountries(name.sort());
      })
      .catch((err) => console.log("error while fetching...", err));
  }, []);

  useEffect(() => {
    firstname.current = "default";
    lastname.current = "default";
    address.current = "default";
    phone.current = "default";
    email.current = "default";
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      props.submitted(true);
    }, 1000);
  };

  return (
    <div className="checkoutdetail_main">
      <div className="checkoutdetail_header">
        <span>Please Provide your Personal Details: </span>
      </div>
      <div className="checkoutdetail_form">
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ display: "flex" }}>
            <div className="form-group">
              <label>
                FirstName<span style={{ color: "red" }}>*</span>
              </label>
              <input ref={firstname}></input>
            </div>
            <div className="form-group">
              <label>
                LastName<span style={{ color: "red" }}>*</span>
              </label>
              <input ref={lastname}></input>
            </div>
          </div>
          <div className="form-group inCenter">
            <div className="form-group">
              <label>
                Phone<span style={{ color: "red" }}>*</span>
              </label>
              <input ref={phone}></input>
            </div>
          </div>
          <div className="form-group inCenter">
            <div className="form-group">
              <label>
                Email<span style={{ color: "red" }}>*</span>
              </label>
              <input ref={email} type={"email"}></input>
            </div>
          </div>
          <div className="form-group inCenter">
            <div className="form-group">
              <label>
                Shipping Address
                <span style={{ color: "blue" }}>
                  {" "}
                  (If different than billing address)
                </span>
              </label>
              <input
                onChange={(e) => (address.current = e.target.value)}
                ref={address}
              ></input>
            </div>
          </div>
          <div className="form-group inCenter">
            <div className="form-group">
              <label>Country</label>
              <select style={{ width: "300px" }}>
                {countries.map((elem, key) => {
                  return (
                    <option key={key} value={elem}>
                      {elem}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <input type={"submit"} />
          <>{loading ? <>loading...</> : ""}</>
        </form>
      </div>
    </div>
  );
};
