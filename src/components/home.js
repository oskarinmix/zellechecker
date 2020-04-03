import React, { useState, useContext } from "react";
import "./Login_v1/css/main.css";
import "./Login_v1/css/util.css";
import "../assets/css/animate.css";
import imgLogin from "./Login_v1/images/img-01.png";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import App from "../auth/auth";
import { AuthContext } from "../components/Auth";
import imgZelle from "../assets/img/Zelle.jpg";
import logoZelle from "../assets/img/logo.png";
const Home = ({ history }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="limiter">
      <div className="container-login100 ">
        <div
          className="d-flex justify-content-around flex-column align-items-center"
          style={{
            backgroundColor: "black",
            minHeight: "80vh",
            width: "100%"
          }}
        >
          <div className="d-flex justify-content-around px-4 text-center w-100">
            <Link to="/">
              <img src={logoZelle} alt="logo" style={{ height: "50px" }}></img>
            </Link>

            {!currentUser ? (
              <div className="d-flex">
                <Link to="/login">
                  <h1 className="px-4">Login </h1>
                </Link>
                <Link to="/register">
                  <h1 className="px-4"> Register </h1>
                </Link>
              </div>
            ) : (
              <div className="d-flex">
                <Link to="/dashboard">
                  <h1 className="px-4">Mi Cuenta </h1>
                </Link>
                <Link to="" onClick={() => App.auth().signOut()}>
                  <h1 className="px-4"> Salir </h1>
                </Link>
              </div>
            )}
          </div>

          <h1 style={{ color: "white", top: 0 }}> Zelle Register/Checker</h1>
          <img
            src={imgZelle}
            alt="zelle"
            className="img-fluid"
            style={{ maxWidth: "80%" }}
          ></img>
        </div>
      </div>
    </div>
  );
};
export default withRouter(Home);
