import React from "react";
import { Link } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import { FaShopify } from "react-icons/fa";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function NavBar(props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary data-bs-theme=dark">
        <div className="container-fluid">
          <h1
            className="logo text-white"
            style={{ fontFamily: "Zantiqa4F", marginLeft: "5rem" }}
          >                  
          <Link
          to="/home"
          className="nav-link active text-white"
          aria-current="page"
        >
            RunnersParadise
        </Link>
          </h1>
          <div>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link text-white">
                    ¿Quiénes somos?
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/create" className="nav-link text-white">
                    Create
                  </Link>
                </li>
                <Link to="#" className="nav-link text-white">
                  <FaShopify
                    style={{
                      fontSize: "24px",
                      marginLeft: "1rem",
                    }}
                  />
                </Link>
                <li
                  className="nav-item dropdown"
                  style={{ marginRight: "5rem" }}
                >
                  <Link
                    className="nav-link text-white dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <IoPersonSharp
                      style={{
                        fontSize: "24px",
                        marginLeft: "10px",
                        marginRight: "0.5rem",
                      }}
                    />
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/register" className="dropdown-item">
                        Regístrate
                      </Link>
                    </li>
                    <li>
                      <Link to="/login" className="dropdown-item">
                        Inicia Sesión
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
