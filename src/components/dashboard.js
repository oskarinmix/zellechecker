import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import List from "./list";
import Form from "./form";
import App from "../auth/auth";
import logoZelle from "../assets/img/logo.png";
const Dashbord = () => {
  // const [docs, setDocs] = useState([]);
  // const [doc, setDoc] = useState(null);

  // const guardarTransaccion = async () => {
  //   const db = firebase.firestore();
  //   const obj = {
  //     amount: 150,
  //     sender: "Abrahams Gutierrez",
  //     email: "patricia@gmail.com",
  //     date: "12/04/2020",
  //     ref: "#h5jhg5g36",
  //     type: "deposit",
  //     created_at: new Date().toLocaleDateString(),
  //   };
  //   try {
  //     const { av } = await db.collection("transactions").add(obj);
  //     consultarTransacciones();
  //   } catch (error) {
  //     alert(error);
  //     console.error({ error: error });
  //   }
  // };
  // const getData = async () => {
  //   const db = firebase.firestore();
  //   const transCollection = db.collection("transactions");
  //   var respuesta = [];
  //   var resp = transCollection
  //     .get()
  //     .then((docs) => {
  //       docs.forEach((doc) => {
  //         respuesta = [...respuesta, { id: doc.id, ...doc.data() }];
  //       });
  //       return respuesta;
  //     })
  //     .catch((e) => e);
  //   return resp;
  // };
  // const getDoc = async (id) => {
  //   const db = firebase.firestore();
  //   const transCollection = db.collection("transactions");
  //   var resp = transCollection
  //     .doc(id)
  //     .get()
  //     .then((doc) => {
  //       if (doc.data()) {
  //         return { id: doc.id, ...doc.data() };
  //       } else {
  //         return null;
  //       }
  //     })
  //     .catch((e) => e);
  //   return resp;
  // };

  // const consultarTransacciones = async () => {
  //   const resp = await getData();
  //   setDocs(resp);
  // };
  // const consultarDoc = async (id) => {
  //   const resp = await getDoc(id);
  //   setDoc(resp);
  // };
  // const borrarElement = async (id) => {
  //   const db = firebase.firestore();
  //   db.collection("transactions")
  //     .doc(id)
  //     .delete()
  //     .then(function () {
  //       console.log("Document successfully deleted!");
  //       setDoc(null);
  //     })
  //     .catch(function (error) {
  //       console.error("Error removing document: ", error);
  //     });
  // };

  return (
    <>
      <div
        className="bg-light d-flex justify-content-around align-items-center"
        style={{ height: "100px", width: "100%" }}
      >
        <div className="d-flex align-items-center"><img src={logoZelle} alt="logo" style={{ height: "50px" }}></img>
        <h3 className="m-l-10"> Dashboard - Zelle Checker</h3></div>
        <div className="d-flex justify-content-around" style={{ width: "30%" }}>
          <button type="button" className="btn-btn-primary">
            <Link to="/dashboard/form">Agregar Transacción </Link>
          </button>
          <button type="button" className="btn-btn-primary">
            <Link to="/dashboard">Ver Transacciones </Link>
          </button>
          <button
            type="button"
            className="btn-btn-primary"
            onClick={() => App.auth().signOut()}
          >
            Logout
          </button>
        </div>
      </div>
      <Switch>
        <Route path="/dashboard/form" component={Form}></Route>
        <Route path="/dashboard/" component={List}></Route>
      </Switch>
    </>
  );
};

export default Dashbord;
// <button onClick={() => App.auth().signOut()}>Sign out</button>
//       <button className="btn btn-primary" onClick={guardarTransaccion}>
//         Guardar Transaccion
//       </button>
//       <button className="btn btn-primary" onClick={consultarTransacciones}>
//         consultar Transaccion
//       </button>
//       <button
//         className="btn btn-primary"
//         onClick={(id) => consultarDoc("2DW0yL1sxtqeoYs6hvDr")}
//       >
//         ID Transaccion
//       </button>
//       <button
//         className="btn btn-primary"
//         onClick={(id) => borrarElement("KnoxGqzfWg7CxrgCvxrd")}
//       >
//         Del Transaccion
//       </button>
