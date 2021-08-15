import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/layout/NavBar";
import Alert from "./components/layout/Alert";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import About from "./components/pages/About";
import axios from "axios";

class App extends React.Component {
  state = {
    // could make this null instead []
    users: [],
    //could make this ull instead{}
    user: {},
    loading: false,
    alert: null,
  };

  // search Github users from Search.js passed as props. on onSubmit.
  searchUsers = async (text) => {
    // lading true gives us that spinnerGif when loading items.
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    // users: res.data.items gives us our users from our api request.
    this.setState({ users: res.data.items, loading: false });
  };
  // get  single github user
  getUser = async (username) => {
    // lading true gives us that spinnerGif when loading items.
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    // users: res.data gives us our single user from our api request.
    this.setState({ user: res.data, loading: false });
  };
  //clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });
  // set alert by pushing it into the state
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 2000);
  };

  render() {
    // const is for destructuring
    const { users, loading, alert, user } = this.state;
    return (
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
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      // gets length of users and if greater then 0 then true or else make it false'
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={this.state.users} />
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
                    getUser={this.getUser}
                    user={user}
                    // loading being called from Users
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
