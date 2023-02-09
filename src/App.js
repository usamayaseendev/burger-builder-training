import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import React, { useState } from "react";
import Nav from "./Components/Nav";
function App() {
  const [user, setUser] = useState(null);
  const [activeItem, setActiveItem] = useState("Burger Builder");

  return (
    <>
      <Nav activeItem={activeItem} setActiveItem={setActiveItem} user={user} />
      {false && <Login />}
      <Home user={user} setUser={setUser} />
    </>
  );
}

export default App;
