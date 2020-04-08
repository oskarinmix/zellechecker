import React from "react";
import { Link } from "react-router-dom";

const Fourohfour = () => {
  return (
    <div className="d-flex justify-content-center align-items-center w-100 vh-100 bg-dark">
      <div className="d-flex flex-column">
        <h1 style={{ color: "white" }}> 404 Página no Encontrada</h1>
        <button className="mt-5 mx-auto text-center btn btn-primary">
          <Link to="/" style={{ color: "white" }}>
            Volver al Inicio
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Fourohfour;
