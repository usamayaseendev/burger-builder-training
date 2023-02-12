import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import React, { useEffect, useState } from "react";
import Nav from "./Components/Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Logout from "./Pages/Logout";
import Orders from "./Pages/Orders";

function App() {
  const [user, setUser] = useState(null);
  // // const [user, setUser] = useState({
  //   username: "here",
  // });
  const [activeItem, setActiveItem] = useState(
    window.location.pathname === "/auth" ? "Login" : "Burger Builder"
  );
  //without using react routing, we'll use window.location.pathname to indentify the current location
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  }, []);

  return (
    <>
      <Router>
        <Nav
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          user={user}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={<Home user={user} setUser={setUser} />}
          />
          <Route
            path="/auth"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route
            path="/logout"
            element={<Logout user={user} setUser={setUser} />}
          />
          <Route
            path="/orders"
            element={<Orders user={user} setUser={setUser} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
