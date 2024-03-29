import React, {useContext,useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import { FaShopify } from "react-icons/fa";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import logo from "../../assets/Runners Paradise.png";
import style from "./navBar.module.css";
import {AuthContext} from "../AuthProvider/authProvider";
import {gapi} from "gapi-script";

export default function NavBar(props) {
  const { auth, setAuth } = useContext(AuthContext);
  const history = useHistory();

  const logOut = () => {
    if (window.gapi && window.gapi.auth2) {
      var auth2 = window.gapi.auth2.getAuthInstance();
      auth2.disconnect().then(function () {
        console.log('User disconnected.');
      });
    }

    setAuth(null);
    localStorage.removeItem('auth');
    history.push('/home');
  };


  useEffect(() => {
  console.log('Valor actualizado de auth:', auth);
}, [auth]);

const imgDefault = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"

  if (auth && auth.token) {
    console.log('Usuario autenticado:', auth.token);
    // Usuario autenticado
    const { token } = auth;
const accessToken = token ? token.accessToken : null;
    return (
      <>
        <div className={style.navContainer}>
          <nav className="navbar navbar-expand-lg bg-white">
            <div className="container-fluid">
              <Link to="/home" className="nav-link active text-primary" aria-current="page">
                <img className={style.logoRunners} src={logo} alt="Runners Paradise Logo" />
              </Link>
              <div className={style.searchBarContent}></div>
              <div className={style.searchBarContainer}></div>
              <div>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                  <ul className="navbar-nav">
                    <li className={style.navBarContentFirst}>
                      <Link to="/about" className="nav-link text-black" style={{ position: "relative", top: "1px", marginRight: "10px" }}>
                        ¿Quiénes somos?
                      </Link>
                    </li>
                    <li className={style.navBarContent}>
                    <Link to="#" className="nav-link text-black">
                      <FaShopify style={{ fontSize: "24px", zIndex: "800" }} />
                    </Link>
                    </li>
                    <div className={style.userContent}>
                      <h4>{token?.name}</h4>
                    </div>
                    <li className="nav-item dropdown" style={{ marginRight: "85px" }}>
                      <div className={style.userImage}></div>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="/perfil" className="dropdown-item">
                            Perfil
                          </Link>
                        </li>
                        <li>
                          <Link to="/configuracion" className="dropdown-item">
                           ajustes
                          </Link>
                        </li>
                        <li>
                          <Link to="/profiledit" className="dropdown-item">
                           editar perfil
                          </Link>
                        </li>
                        <div className="dropdown-divider"></div>
                        <li className="dropdown-item" onClick={logOut}>
                          Cerrar Sesión
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
                      <img src={token.imageUrl || imgDefault} style={{ borderRadius: "50%", height: "15%", width: "15%", }} alt="User Avatar" />
                    </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </>
    );
  } else {
    console.log('Usuario no autenticado');
    return (
      <>
        <div className={style.navContainer}>
          <nav className="navbar navbar-expand-lg bg-white">
            <div className="container-fluid">
              <Link to="/home" className="nav-link active text-primary" aria-current="page">
                <img className={style.logoRunners} src={logo} alt="Runners Paradise Logo" />
              </Link>
              <div className={style.searchBarContent}></div>
              <div className={style.searchBarContainer}></div>
              <div className={style.navBarContent}>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link to="/create" className="nav-link text-black" style={{ position: "relative", top: "1px", marginRight: "8px" }}>
                        Create
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/about" className="nav-link text-black">
                        ¿Quiénes somos?
                      </Link>
                    </li>
                    <Link to="#" className="nav-link text-black">
                      <FaShopify style={{ fontSize: "24px", marginLeft: "1rem" }} />
                    </Link>
                    <li className="nav-item dropdown" style={{ marginRight: "5rem" }}>
                      <Link
                        className="nav-link text-black dropdown-toggle"
                        to="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <IoPersonSharp style={{ fontSize: "24px", marginLeft: "10px", marginRight: "0.5rem" }} />
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
  }
}

//dsadsds