import React from "react";
import { Link } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import { FaShopify } from "react-icons/fa";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import logo from "../../assets/Runners Paradise.png";
import style from "./navBar.module.css";
import { useSelector } from "react-redux";

export default function NavBar(props) {
  const user = useSelector((state) => state.userDataSession);
  const isAdmin = useSelector((state) => state.isAdmin);
  if (!user || !user.userData) {
    return (
      <>
        <div className={style.navContainer}>
          <nav className="navbar navbar-expand-lg bg-white">
            {" "}
            {/* Cambia bg-primary a bg-white */}
            <div className="container-fluid">
              <Link
                to="/home"
                className="nav-link active text-primary"
                aria-current="page"
              >
                <img
                  className={style.logoRunners}
                  src={logo}
                  alt="Runners Paradise Logo"
                />
              </Link>
              <div className={style.searchBarContainer}></div>
              <div className={style.navBarContent}>
                <div
                  className="collapse navbar-collapse"
                  id="navbarNavDropdown"
                >
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link
                        to="/create"
                        className="nav-link text-black"
                        style={{
                          position: "relative",
                          top: "1px",
                          marginRight: "8px",
                        }}
                      >
                        {" "}
                        Create{" "}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/about" className="nav-link text-black">
                        {" "}
                        ¿Quiénes somos?{" "}
                      </Link>
                    </li>
                    <Link to="/shopping" className="nav-link text-black">
                      <FaShopify
                        style={{ fontSize: "24px", marginLeft: "1rem" }}
                      />
                    </Link>
                    <li
                      className="nav-item dropdown"
                      style={{ marginRight: "5rem" }}
                    >
                      <Link
                        className="nav-link text-black dropdown-toggle"
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
        </div>
      </>
    );
  } else if (user.userData) {
    return (
      <>
        <div className={style.navContainer}>
          <nav className="navbar navbar-expand-lg bg-white">
            {" "}
            {/* Cambia bg-primary a bg-white */}
            <div className="container-fluid">
              <Link
                to="/home"
                className="nav-link active text-primary"
                aria-current="page"
              >
                <img
                  className={style.logoRunners}
                  src={logo}
                  alt="Runners Paradise Logo"
                />
              </Link>
              <div className={style.searchBarContent}></div>
              <div className={style.searchBarContainer}></div>
              <div>
                <div
                  className="collapse navbar-collapse"
                  id="navbarNavDropdown"
                >
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link
                        to="/create"
                        className="nav-link text-black"
                        style={{
                          position: "relative",
                          top: "1px",
                          marginRight: "8px",
                        }}
                      >
                        {" "}
                        Create{" "}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/about"
                        className="nav-link text-black"
                        style={{
                          position: "relative",
                          top: "1px",
                          marginRight: "10px",
                        }}
                      >
                        {" "}
                        ¿Quiénes somos?{" "}
                      </Link>
                    </li>
                    <Link to="/shopping" className="nav-link text-black">
                      <FaShopify
                        style={{
                          fontSize: "24px",
                          marginrig: "1rem",
                          zIndex: "800",
                        }}
                      />
                    </Link>
                    <div className={style.userContent}>
                      <h4>
                        {user && user.userData
                          ? user.userData.name
                          : "Invitado"}
                      </h4>
                    </div>
                    <li
                      className="nav-item dropdown"
                      style={{ marginRight: "5rem" }}
                    >
                      <div className={style.userImage}></div>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="/perfil" className="dropdown-item">
                            Perfil
                          </Link>
                        </li>
                        <li>
                          <Link to="/configuracion" className="dropdown-item">
                            Ajustes
                          </Link>
                        </li>
                        <div className="dropdown-divider"></div>{" "}
                        {/* Agrega esta línea */}
                        <li>
                          <Link to="/logOut" className="dropdown-item">
                            Cerrar Sesión
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>

                  <Link
                    className="nav-link text-black dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user && user.userData && user.userData.imageUrl && (
                      <img
                        src={user.userData.imageUrl}
                        style={{
                          borderRadius: "50%",
                          height: "26%",
                          width: "26%",
                        }}
                      ></img>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </>
    );

    //              **** TERCER IF PARA CUANDO ES ADMIN ****
  } else if (isAdmin) {
    return (
      <>
        <div className={style.navContainer}>
          <nav className="navbar navbar-expand-lg bg-white">
            {" "}
            {/* Cambia bg-primary a bg-white */}
            <div className="container-fluid">
              <Link
                to="/home"
                className="nav-link active text-primary"
                aria-current="page"
              >
                <img
                  className={style.logoRunners}
                  src={logo}
                  alt="Runners Paradise Logo"
                />
              </Link>
              <div className={style.searchBarContent}></div>
              <div className={style.searchBarContainer}></div>
              <div>
                <div
                  className="collapse navbar-collapse"
                  id="navbarNavDropdown"
                >
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link
                        to="/create"
                        className="nav-link text-black"
                        style={{
                          position: "relative",
                          top: "1px",
                          marginRight: "8px",
                        }}
                      >
                        {" "}
                        Create{" "}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/about"
                        className="nav-link text-black"
                        style={{
                          position: "relative",
                          top: "1px",
                          marginRight: "10px",
                        }}
                      >
                        {" "}
                        ¿Quiénes somos?{" "}
                      </Link>
                    </li>
                    <Link to="#" className="nav-link text-black">
                      <FaShopify
                        style={{
                          fontSize: "24px",
                          marginrig: "1rem",
                          zIndex: "800",
                        }}
                      />
                    </Link>
                    <div className={style.userContent}>
                      <h4>
                        {user && user.userData
                          ? user.userData.name
                          : "Invitado"}
                      </h4>
                    </div>
                    <li
                      className="nav-item dropdown"
                      style={{ marginRight: "5rem" }}
                    >
                      <div className={style.userImage}></div>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="/register" className="dropdown-item">
                            Perfil
                          </Link>
                        </li>
                        <li>
                          <Link to="/login" className="dropdown-item">
                            Ajustes
                          </Link>
                        </li>
                        <div className="dropdown-divider"></div>{" "}
                        {/* Agrega esta línea */}
                        <li>
                          <Link to="/login" className="dropdown-item">
                            Cerrar Sesión
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>

                  <Link
                    className="nav-link text-black dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user && user.userData && user.userData.imageUrl && (
                      <img
                        src={user.userData.imageUrl}
                        style={{
                          borderRadius: "50%",
                          height: "26%",
                          width: "26%",
                        }}
                      ></img>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </>
    );
  }
}
