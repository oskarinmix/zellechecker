import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { Link } from "react-router-dom";
import Spinner from "./spinner";
const Details = (props) => {
  const {
    match: { params },
  } = props;
  const [transaction, setTransaction] = useState(null);
  useEffect(() => {
    const getDoc = async (id) => {
      const db = firebase.firestore();
      const transCollection = db.collection("transactions");
      var resp = transCollection
        .doc(params.id)
        .get()
        .then((doc) => {
          setTransaction(doc.data());
          if (doc.data()) {
            return { id: doc.id, ...doc.data() };
          } else {
            return null;
          }
        })
        .catch((e) => console.log(e));
      return resp;
    };
    getDoc(params.id);
    // eslint-disable-next-line
  }, []);
  return (
    <div className="limiter">
      <div className="container-login100 bg-dark">
        {transaction ? (
          <div className="wrap-login100 animated zoomInRight faster">
            <h5 className="mb-5">
              Detalles de la transacción <code>{params.id}</code>
            </h5>

            <div className="w-100">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="home-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    Detalles
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="profile-tab"
                    data-toggle="tab"
                    href="#profile"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Screenshot
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="card" style={{ width: "100%" }}>
                    <div className="card-body">
                      <h5 className="card-title">
                        Referecia : <code>{"  " + transaction.ref}</code>
                      </h5>
                      <div className="card-text">
                        <h5>
                          Fecha de la Transacción:
                          <code>{"  " + transaction.date}</code>
                        </h5>
                        <h5>
                          Persona que Envia:{" "}
                          <code>{"  " + transaction.sender}</code>
                        </h5>
                        <h5>
                          Correo que Envia:{" "}
                          <code>{"  " + transaction.email}</code>
                        </h5>
                        <h5>
                          Monto: <code>{"  " + transaction.amount}$</code>
                        </h5>
                        <h5>
                          Descripción:
                          <code> {"  " + transaction.description}</code>
                        </h5>
                        {transaction.status === "verified" ? (
                          <span className="badge badge-success">
                            Verificada
                          </span>
                        ) : transaction.status === "unverified" ? (
                          <span className="badge badge-warning">Pendiente</span>
                        ) : (
                          <span className="badge badge-danger">Rechazada</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="card bg-dark text-white">
                    <img
                      src={transaction.picUrl}
                      className="card-img"
                      alt={transaction.ref}
                    />
                    <div className="card-img-overlay">
                      <h5 className="card-title">
                        <code>
                          Screenshot {transaction.ref} subido el{"  "}
                          {transaction.date}
                        </code>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/dashboard/list">
              <span
                href="#"
                className="btn btn-primary "
                style={{ marginTop: "15px" }}
              >
                Regresar
              </span>
            </Link>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Details;
