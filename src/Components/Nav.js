import React from "react";
import "./styles.css";
import Logo from "../Assets/Images/burger-logo.png";
import { Link } from "react-router-dom";

const Nav = (props) => {
  const { activeItem, setActiveItem, user } = props;

  const handleActiveClick = (item) => {
    setActiveItem(item);
  };
  return (
    // ? Navigation Bar
    <nav className="navbar navbar-expand fixed-top " id="navbar">
      <div className="container-fluid" id="navbar-list-container">
        {
          //? NavBar LHS
        }
        <div className="bg-light p-2 d-flex justify-content-center rounded">
          <img src={Logo} alt="Burger Builder" width={45} height={28} />
        </div>
        {
          //? NavBar RHS/Links
        }
        <ul className="navbar-nav" id="navbar-list">
          <li
            className={`navbar-item d-flex justify-content-center px-2 ${
              activeItem === "Burger Builder" ? "active" : ""
            }`}
          >
            <Link
              className="navbar-text d-flex text-center"
              to="/"
              onClick={() => handleActiveClick("Burger Builder")}
            >
              Burger Builder
            </Link>
          </li>
          {user == null ? (
            <li
              className={`navbar-item d-flex justify-content-center px-2 ${
                activeItem === "Login" ? "active" : ""
              }`}
            >
              <Link
                className="navbar-text"
                to={"/auth"}
                onClick={() => handleActiveClick("Login")}
              >
                Login
              </Link>
            </li>
          ) : (
            <>
              <li
                className={`navbar-item d-flex justify-content-center px-2 ${
                  activeItem === "Orders" ? "active" : ""
                }`}
              >
                <Link
                  className="navbar-text"
                  to="/orders"
                  onClick={() => handleActiveClick("Orders")}
                >
                  Orders
                </Link>
              </li>
              <li className="navbar-item d-flex justify-content-center px-2">
                <Link className="navbar-text" to="/logout">
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
