import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GithubState from "./context/github/GithubState";
import "./App.css";
import NavBar from "./components/layout/NavBar";
import Alert from "./components/layout/Alert";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import About from "./components/pages/About";
import axios from "axios";

const App = () => {
  // could make this null instead []
  const [users, setUsers] = useState([]);
  //could make this ull instead{}
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // search Github users from Search.js passed as props. on onSubmit.
  const searchUsers = async (text) => {
    // lading true gives us that spinnerGif when loading items.
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    // users: res.data.items gives us our users from our api request.
    setUsers(res.data.items);
    // stops the loading spinner
    setLoading(false);
  };
  // get  single github user
  const getUser = async (username) => {
    // lading true gives us that spinnerGif when loading items.
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    // users: res.data gives us our single user from our api request.
    setUser(res.data);
    // stops the loading spinner
    setLoading(false);
  };

  // get users repo
  const getUserRepos = async (username) => {
    // lading true gives us that spinnerGif when loading items.
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    // users: res.data gives us our single user from our api request
    setRepos(res.data);
    // stops the loading spinner
    setLoading(false);
  };

  //clear users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };
  // set alert by pushing it into the state

  const showAlert = (msg, type) => {
    setAlert({ msg, type });

    setTimeout(() => setAlert(null), 2000);
  };

  // const is for destructuring

  return (
    <GithubState>
      <Router>
        <div className="App">
          <NavBar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={searchUsers}
                      clearUsers={clearUsers}
                      // gets length of users and if greater then 0 then true or else make it false'
                      showClear={users.length > 0 ? true : false}
                      showAlert={showAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                // path /user/:login to be filled with the user
                exact
                path="/user/:login"
                render={(props) => (
                  // render, spread the props then calls the getUser function to run the get request on user and fill the user object with data.
                  <User
                    {...props}
                    getUser={getUser}
                    getUserRepos={getUserRepos}
                    user={user}
                    repos={repos}
                    // loading being called from Users
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
