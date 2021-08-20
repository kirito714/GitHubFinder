import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";
import "./App.css";
import NavBar from "./components/layout/NavBar";
import Alert from "./components/layout/Alert";
import Home from "./components/pages/Home";
import User from "./components/users/User";
import NotFound from "./components/pages/NotFound";

import About from "./components/pages/About";

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <NavBar />
            <div className="container">
              <Alert />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route
                  // path /user/:login to be filled with the user
                  exact
                  path="/user/:login"
                  component={User}
                />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
