import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import Swal from "sweetalert2";
const Form = () => {
  const [email, setEmail] = useState("");
  const [ref, setRef] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [sender, setSender] = useState("");
  const [file, setFile] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");

  const handleCapture = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const ind = file.name.lastIndexOf(".");
    const name = file.name.slice(0, file.name.lastIndexOf("."));
    const ext = file.name.slice(ind);
    const storageRef = firebase
      .storage()
      .ref(`captures/${name}-${Date.now()}${ext}`);
    const task = storageRef.put(file);

    task.on(
      "state_changed",
      (snapshot) => {
        let per = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercentage(per);
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        storageRef.getDownloadURL().then((url) => {
          setPicture(url);
          setPercentage(100);
        });
      }
    );
  };

  const isAValidForm = () => {
    return (
      email.length > 0 &&
      sender.length > 0 &&
      amount.length > 0 &&
      ref.length > 0 &&
      date.length > 0 &&
      picture.length > 0 &&
      description.length > 0
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
      description: description,
      picUrl: picture,
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
        setPicture("");
        setPercentage("");
        setFile("");
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

          <div className="wrap-input100">
            <textarea
              className="input100"
              type="textArea"
              value={description}
              max={Date.now()}
              autoComplete="off"
              placeholder="Agrega una Descripción"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <span className="focus-input100"></span>
            <span className="symbol-input100">
              <i className="fa fa-comments" aria-hidden="true"></i>
            </span>
          </div>

          <div className="wrap-input100 d-flex justify-content-center mt-2">
            <label
              htmlFor="file-upload"
              className="custom-file-upload badge badge-primary"
              style={{
                border: "1px solid #ccc",
                display: "inline-block",
                padding: "6px 12px",
                cursor: "pointer",
              }}
              disabled={`${percentage !== 0 ? "true" : false}`}
            >
              {file ? (
                <i className="fa fa-check" style={{ color: "green" }}></i>
              ) : (
                <i className="fa fa-cloud-upload"></i>
              )}
              <span> Subir Captura</span>
              {percentage > 0 ? <span> {percentage.toFixed(2)}%</span> : ""}
            </label>
            <input
              id="file-upload"
              className="input100"
              type="file"
              autoComplete="off"
              onChange={(e) => {
                handleCapture(e);
              }}
              style={{ display: "none" }}
            />
            {/*<span className="focus-input100"></span>
            <span className="symbol-input100">
              <i className="fa fa-file" aria-hidden="true"></i>
            </span>*/}
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
