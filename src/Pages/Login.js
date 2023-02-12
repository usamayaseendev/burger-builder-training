import React, { useState } from "react";
import { redirect } from "react-router-dom";

import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";

import "./LoginStyles.css";

const Login = (props) => {
  const { user, setUser } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [mode, setMode] = useState("SIGN IN");

  const changeMode = () => {
    if (mode === "SIGN IN") {
      setMode("REGISTER");
    } else {
      setMode("SIGN IN");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (mode === "REGISTER") {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          email: email,
          password: password,
          orders: [],
        });
        // set the user to localStorage
        const user = {
          email: email,
          password: password,
          orders: [],
          id: docRef.id,
        };
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        window.href = "/"; //TODO: this is not working
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        setErrorMessage(e.message); // TODO: add switch statement to display appropriate error messages
        console.error("Error adding document: ", e);
      }
    } else {
      const q = query(
        collection(db, "users"),
        where("email", "==", email),
        where("password", "==", password)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setErrorMessage("INVALID_PASSWORD");
      } else {
        // print querySnapshot
        var user = {};
        querySnapshot.forEach((doc) => {
          user = {
            email: doc.data().email,
            password: doc.data().password,
            orders: doc.data().orders,
            id: doc.id,
          };
        });
        console.log(user);
        // localStorage.setItem("user", user);

        // localStorage.setItem("user", JSON.stringify());
        // redirect("/");
      }
    }
  };

  return (
    <main className="main">
      <div className="form-container">
        {errorMessage && <p id="error"> {errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              id="email"
              placeholder="E-mail Address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" className="buttons button-success">
            SUBMIT
          </button>
        </form>
        <button onClick={changeMode} className="buttons button-auth">
          {mode}
        </button>
      </div>
    </main>
  );
};

export default Login;
