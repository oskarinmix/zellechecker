import React, { useState, useContext } from "react";
import "./Login_v1/css/main.css";
import "./Login_v1/css/util.css";
import "../assets/css/animate.css";
import imgLogin from "./Login_v1/images/img-01.png";
import { withRouter, Redirect } from "react-router";
import App from "../auth/auth";
import { AuthContext } from "../components/Auth";
const Register = ({ history }) => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");

  const validateForm = () => {
    return (
      email.length > 0 && password.length > 0 && password === passwordConfirm
    );
  };

  const handleRegister = async e => {
    e.preventDefault();
    try {
      await App.auth().createUserWithEmailAndPassword(email, password);
      history.push("/Dashboard");
    } catch (error) {
      alert(error);
    }
  };
  //////////////////////////////////
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 animated zoomInLeft faster">
          <div className="login100-pic js-tilt" data-tilt>
            <img src={imgLogin} alt="IMG" />
          </div>

          <form
            className="login100-form validate-form"
            onSubmit={handleRegister}
          >
            <span className="login100-form-title">Registrarse</span>

            <div
              className="wrap-input100 validate-input"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                className="input100"
                type="text"
                name="email"
                placeholder="Correo Electrónico"
                value={email}
                autoComplete={"none"}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                name="pass"
                placeholder="Contraseña"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
                autoComplete={"current-password"}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>
            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                name="passConfirm"
                placeholder="Repetir Contraseña"
                value={passwordConfirm}
                onChange={e => {
                  setPasswordConfirm(e.target.value);
                }}
                autoComplete={"current-password"}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div className="container-login100-form-btn">
              <button className="login100-form-btn" disabled={!validateForm()}>
                Registrar
              </button>
            </div>
            <div className="text-center p-t-136">
              <a className="txt2" href="/login">
                Inicia Sesión
                <i
                  className="fa fa-long-arrow-right m-l-5"
                  aria-hidden="true"
                ></i>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default withRouter(Register);
