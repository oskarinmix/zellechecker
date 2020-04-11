import React, { useState, useContext } from "react";
import imgLogin from "./images/img-01.png";
import { withRouter, Redirect } from "react-router";
import App from "../auth/auth";
import { AuthContext } from "../components/Auth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const Login = ({ history }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  const validateEmail = () => {
    const patterns = {
      email: /^[a-z\d.-_]+@[a-z\d\-_]+\.[a-z]{2,6}(\.[a-z]{2,6})?$/,
      amount: /^[\d]+$/,
    };
    return patterns.email.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validEmail = validateEmail();
    if (validEmail) {
      try {
        await App.auth().signInWithEmailAndPassword(email, password);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Inicio de Sesión Exitoso",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/dashboard");
      } catch (error) {
        Swal.fire("Correo o Password Incorrecto", error, "error");
      }
    } else {
      Swal.fire("Escribe un Correo Válido", "Verifica tus datos", "error");
    }
  };

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }
  //////////////////////////////////
  return (
    <div className="limiter">
      <div className="container-login100 ">
        <div className="wrap-login100 animated zoomInRight faster">
          <div className="login100-pic js-tilt" data-tilt>
            <img src={imgLogin} alt="IMG" />
          </div>

          <form className="login100-form validate-form" onSubmit={handleLogin}>
            <span className="login100-form-title">Iniciar Sesión</span>

            <div
              className="wrap-input100 validate-input  "
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                className="input100"
                type="text"
                name="email"
                placeholder="Correo Electrónico"
                value={email}
                autoComplete={"none"}
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
              className="wrap-input100 validate-input  "
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                name="pass"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
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
                Ingresar
              </button>
            </div>

            <div className="text-center p-t-12">
              <span className="txt1">Olvidaste </span>
              <a className="txt2" href="/">
                Correo / Contraseña?
              </a>
            </div>

            <div className="text-center p-t-136">
              <Link to="/register">
                <span className="txt2 ml-3 mr-3" href="/register">
                  Registrarte
                  <i
                    className="fa fa-long-arrow-right m-l-5"
                    aria-hidden="true"
                  ></i>
                </span>
              </Link>
              <Link to="/">
                <span className="txt2 ml-3 mr3" href="/">
                  Inicio
                  <i
                    className="fa fa-long-arrow-right m-l-15"
                    aria-hidden="true"
                  ></i>
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default withRouter(Login);
