import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import Swal from "sweetalert2";
const Form = () => {
  const [email, setEmail] = useState("");
  const [ref, setRef] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [sender, setSender] = useState("");
  useEffect(() => {}, []);

  const isAValidForm = () => {
    return (
      email.length > 0 &&
      sender.length > 0 &&
      amount.length > 0 &&
      ref.length > 0 &&
      date.length > 0
    );
  };

  const validateRegex = () => {
    const patterns = {
      email: /^[a-z\d.-_]+@[a-z\d\-_]+\.[a-z]{2,6}(\.[a-z]{2,6})?$/,
      amount: /^[\d]+$/,
    };
    return patterns.email.test(email) && patterns.amount.test(amount);
  };
  const lanzarAlerta = () => {
    Swal.fire(
      "Registro Guardado Exitoso!",
      "Presiona Ok para continuar !",
      "success"
    );
  };
  const guardarTransaccion = async (e) => {
    console.log("Enviando Los Datos");
    e.preventDefault();
    const obj = {
      amount: amount,
      sender: sender,
      email: email,
      date: date,
      ref: ref,
      type: "deposit",
      status: "unverified",
      created_at: new Date().toUTCString(),
    };
    if (validateRegex()) {
      const db = firebase.firestore();
      try {
        await db.collection("transactions").add(obj);
        lanzarAlerta();
        setSender("");
        setEmail("");
        setRef("");
        setAmount("");
        setDate("");
      } catch (error) {
        Swal.fire("Registro Guardado Fallido!", error, "error");
      }
    } else {
      Swal.fire(
        "Por favor verifica los datos enviados!",
        "Correo invalido o monto invalido",
        "error"
      );
    }
  };
  return (
    <div className="bg-dark w-100 vh-100 d-flex justify-content-center align-items-center">
      <div className="wrap-login100 d-flex justify-content-center animated zoomInRight faster">
        <form
          className="login100-form validate-form"
          onSubmit={guardarTransaccion}
        >
          <span className="login100-form-title">Nueva Transacción</span>
          <div className="wrap-input100 ">
            <input
              className="input100"
              type="text"
              placeholder="¿ Quien Envia ?"
              autoComplete="off"
              value={sender}
              onChange={(e) => {
                setSender(e.target.value);
              }}
            />
            <span className="focus-input100"></span>
            <span className="symbol-input100">
              <i className="fa fa-user" aria-hidden="true"></i>
            </span>
          </div>

          <div className="wrap-input100">
            <input
              className="input100"
              type="text"
              placeholder="Email Origen"
              value={email}
              autoComplete="off"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <span className="focus-input100"></span>
            <span className="symbol-input100">
              <i className="fa fa-at" aria-hidden="true"></i>
            </span>
          </div>

          <div className="wrap-input100">
            <input
              className="input100"
              type="text"
              placeholder="Referencia"
              value={ref}
              autoComplete="off"
              onChange={(e) => {
                setRef(e.target.value);
              }}
            />
            <span className="focus-input100"></span>
            <span className="symbol-input100">
              <i className="fa fa-sticky-note" aria-hidden="true"></i>
            </span>
          </div>

          <div className="wrap-input100">
            <input
              className="input100"
              type="text"
              placeholder="Cantidad"
              value={amount}
              autoComplete="off"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <span className="focus-input100"></span>
            <span className="symbol-input100">
              <i className="fa fa-dollar" aria-hidden="true"></i>
            </span>
          </div>

          <div className="wrap-input100">
            <input
              className="input100"
              type="date"
              value={date}
              max={Date.now()}
              autoComplete="off"
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            <span className="focus-input100"></span>
            <span className="symbol-input100">
              <i className="fa fa-calendar" aria-hidden="true"></i>
            </span>
          </div>

          <div className="container-login100-form-btn">
            <button
              className="login100-form-btn"
              onClick={guardarTransaccion}
              disabled={!isAValidForm()}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
