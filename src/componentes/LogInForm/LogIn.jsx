import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import GoogleLogin from "react-google-login";
import {gapi} from "gapi-script";
import style from "./Login.module.css";
import { AuthContext } from "../AuthProvider/authProvider";
import { loginUser } from "../../redux/actions/actions";

export default function LogIn(props) {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });
  const [isValid, setIsValid] = useState(true);
  const { auth, setAuth } = useContext(AuthContext);
  const error = useSelector(state => state.loginError)
  const userRegex = new RegExp ("^[^s@]+@[^s@]+.[^s@]+$");
  const passwordRegex = new RegExp ("^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$");

  const dispatch = useDispatch();

  /* const validarBotonSubmit = () => {
    if (userRegex.test(userData.email) && passwordRegex.test(userData.password)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }; */


  const clientID = "1066333447186-qce53lrh37h3ki1ih2o5fnjminct9rn3.apps.googleusercontent.com"

  

  const handChangePass = (e) => {
    setUserData({
      ...userData,
      password: e.target.value
    });
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      email: e.target.value
    });
  };


  useEffect(() =>{
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      })
    }
    gapi.load("client:auth2", start)
  }, [])
  
  const onFailure = () => {
    console.log("Algo salió mal")
  }
 
  
  const onSuccess = (response) => {
   console.log('Login Success: currentUser:', response.profileObj);
   setAuth({ token: response.profileObj });
  };

  const loginClick = (e) => {
    e.preventDefault();
    dispatch(loginUser(userData, AuthContext));
   };
  
  
  return (
    <>
      <div>
        <div className="row justify-content-center">
          <div className="col-md-4 ml-5 border mt-5 p-5">
            <h2 className="text-center mb-4">Inicie sesión</h2>
            <form className="" onSubmit={loginClick}>
              <div className="mb-3">
                <label className="form-label" style={{color:'black'}}>Email:</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="Escriba aquí su email"
                  style={{ height: "50px", fontSize:'16px' }}
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label" style={{color:'black'}}>Contraseña:</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  value={userData.password}
                  onChange={handChangePass}
                  placeholder="Y aquí su contraseña..."
                  style={{ height: "50px",fontSize:'16px' }}
                ></input>
                {isValid ? <p>La contraseña debe tener al menos 1 minúscula, 1 mayúscula, 1 dígito y 8 caracteres de longitud como mínimo</p> : <p></p>}
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Log In
              </button>
            </form>
          <div className={style.google} style={{"margin": "20px"}}>
          <GoogleLogin 
            clientId={clientID}
            onSuccess={onSuccess}
            onfailure={onFailure}
            cookiePolicy={"single_host_policy"}
            redirectUri={'http://localhost:5173/home'}
        />
        </div>
            <p className="text-center mt-3">¿No estás registrado aún?</p>
            <Link to="/register">
              <p className="text-center">
                <u>Regístrate aquí</u>
              </p>
            </Link>
          </div>
        </div>
        
      </div>
    </>
  );
}
