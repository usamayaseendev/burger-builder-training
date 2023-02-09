import React from "react";
import "./styles.css";
import Logo from "../Assets/Images/burger-logo.png";

const Nav = (props) => {
  const { activeItem, setActiveItem, user } = props;

  const handleActiveClick = (item) => {
    setActiveItem(item);
  };
  return (
    <nav class="navbar navbar-expand-sm fixed-top " id="navbar">
      <div className="container-fluid" id="navbar-list-container">
        <a class="navbar-brand" href="#">
          <img src={Logo} alt="Burger Builder" width={45} height={28} />
        </a>
        <ul className="navbar-nav" id="navbar-list">
          <li
            className={`navbar-item d-flex justify-content-center px-2 ${
              activeItem === "Burger Builder" ? "active" : ""
            }`}
          >
            <a
              className="navbar-text d-flex text-center"
              href="/"
              onClick={() => handleActiveClick("Burger Builder")}
            >
              Burger Builder
            </a>
          </li>
          {user == null ? (
            <li
              className={`navbar-item d-flex justify-content-center px-2 ${
                activeItem === "Login" ? "active" : ""
              }`}
            >
              <a
                className="navbar-text"
                href="/auth"
                onClick={() => handleActiveClick("Login")}
              >
                Login
              </a>
            </li>
          ) : (
            <>
              <li
                className={`navbar-item d-flex justify-content-center px-2 ${
                  activeItem === "Orders" ? "active" : ""
                }`}
              >
                <a
                  className="navbar-text"
                  href="/auth"
                  onClick={() => handleActiveClick("Orders")}
                >
                  Orders
                </a>
              </li>
              <li className="navbar-item">
                <a className="navbar-text" href="/logout">
                  Logout
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
