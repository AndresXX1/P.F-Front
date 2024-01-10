import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import Create from "./componentes/Create/Create";
import Landing from "./views/Landing/landing";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/home/:id" component={Detail} />
            <Route exact path="/create" component={Create} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
