import React, { useState, useContext } from "react";
import imgLogin from "./images/img-01.png";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import App from "../auth/auth";
import { AuthContext } from "../components/Auth";
import Swal from "sweetalert2";
const Register = ({ history }) => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");

  const validateForm = () => {
    return (
      email.length > 0 && password.length > 0 && passwordConfirm.length > 0
    );
  };
  const validateEmail = () => {
    const patterns = {
      email: /^[a-z\d.-_]+@[a-z\d\-_]+\.[a-z]{2,6}(\.[a-z]{2,6})?$/,
      amount: /^[\d]+$/,
    };
    return patterns.email.test(email);
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    const validEmail = validateEmail();
    const samePassword = password === passwordConfirm;
    if (!validEmail || !samePassword) {
      Swal.fire(
        (!validEmail ? "Escribe un Correo Válido" : "") +
          (!samePassword ? " Repite la misma contraseña" : ""),
        "Datos de Registro Incorrectos",
        "error"
      );
    } else {
      try {
        await App.auth().createUserWithEmailAndPassword(email, password);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registro Exitoso",
          showConfirmButton: false,
          timer: 1000,
        });
        history.push("/Dashboard");
      } catch (error) {
        Swal.fire("Por favor verifica los datos enviados!", error, "error");
      }
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
                autoComplete={"off"}
                onChange={(e) => {
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
                autoComplete={"off"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
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
                autoComplete={"off"}
                placeholder="Repetir Contraseña"
                value={passwordConfirm}
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                }}
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
              <Link to="/login">
                <a className="txt2 ml-3 mr-3" href="/register">
                  Iniciar Sesiòn
                  <i
                    className="fa fa-long-arrow-right m-l-5"
                    aria-hidden="true"
                  ></i>
                </a>
              </Link>
              <Link to="/">
                <a className="txt2 ml-3 mr3" href="/">
                  Inicio
                  <i
                    className="fa fa-long-arrow-right m-l-15"
                    aria-hidden="true"
                  ></i>
                </a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default withRouter(Register);
