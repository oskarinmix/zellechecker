import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { Link } from "react-router-dom";
import Spinner from "./spinner";
const Form = () => {
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(false);

  const consultarTransacciones = async () => {
    const resp = await getData();
    setTransactions(resp);
    setLoading(false);
  };
  const getData = async () => {
    const db = firebase.firestore();
    const transCollection = db.collection("transactions");
    var respuesta = [];
    var resp = transCollection
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          respuesta = [...respuesta, { id: doc.id, ...doc.data() }];
        });
        return respuesta;
      })
      .catch((e) => e);
    return resp;
  };
  useEffect(() => {
    setLoading(true);
    consultarTransacciones();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="bg-dark w-100 vh-100 d-flex justify-content-center align-items-center">
      <div
        className="wrap-login100 d-flex justify-content-center animated zoomInRight faster"
        style={{ padding: "5px" }}
      >
        <span className="login100-form-title mt-5">Lista de Transacciones</span>
        {!loading && transactions ? (
          transactions.length > 0 ? (
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">Referencia</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Envia :</th>
                  <th scope="col">Monto</th>
                  <th scope="col">Status</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, index) => {
                  return (
                    <tr key={index}>
                      <td>{t.ref}</td>
                      <td>{t.date}</td>
                      <td>{t.sender}</td>
                      <td>{t.amount}$</td>
                      <td>
                        {t.status === "verified" ? (
                          <span className="badge badge-success">
                            Verificada
                          </span>
                        ) : t.status === "unverified" ? (
                          <span className="badge badge-warning">Pendiente</span>
                        ) : (
                          <span className="badge badge-danger">Rechazada</span>
                        )}
                      </td>
                      <td align="center">
                        <a
                          href={t.picUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="badge badge-primary mr-2"
                        >
                          <i className="fa fa-camera" aria-hidden="true"></i>{" "}
                          <i className="fa fa-download" aria-hidden="true"></i>{" "}
                          <span> Capture</span>
                        </a>
                        <Link to={`/dashboard/details/${t.id}`}>
                          <span style={{ color: "white" }}>
                            <i
                              className="fa fa-info"
                              style={{ color: "white" }}
                            ></i>{" "}
                            Ver Detalles
                          </span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h4> No hay Transacciones Registradas</h4>
          )
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Form;
