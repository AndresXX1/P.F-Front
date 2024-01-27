import { useState } from "react";
import "./App.css";
import NavBar from "./componentes/NavBar/navBar";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Landing from "./views/Landing/landing";
import Home from "./views/Home/home";
import Detail from "./views/Detail/detail";
import Create from "./componentes/Create/create";
import LogIn from "./componentes/LogInForm/LogIn";
import About from "./componentes/About/about";
import Registro from "./componentes/Register/Register";
import Perfil from "./componentes/perfilDeUsuario/perfil"
import Ajustes from "./componentes/Configuracion/configuracion"
import LogOut from "./componentes/LogOut/logOut"
import ProtectedRoute from './GeneralLogin';
import Shopping from "./views/Shopping/Shopping";

function App() {
  return (
    <Router>
      <div className="App">
        <Route
          render={(props) => {
            if (props.location.pathname !== "/") {
              return <NavBar />;
            }
            return null;
          }}
        />
  <Switch>
 <Route exact path="/" component={Landing} />
 <Route exact path="/home" component={Home} />
 <ProtectedRoute exact path="/create" component={Create} />
 <Route exact path="/login" component={LogIn} />
 <Route exact path="/about" component={About} />
 <Route exact path="/register" component={Registro} />
 <Route exact path="/detail/:id" component={Detail} />
 <Route exact path="/perfil" component= {Perfil} />
 <Route exact path="/Configuracion" component= {Ajustes} />
 <Route exact path="/logOut" component= {LogOut} />
 <Route exact path="/shopping" component= {Shopping} />
</Switch>
      </div>
    </Router>
  );
}

export default App;
