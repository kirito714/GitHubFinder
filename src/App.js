import React, { Fragment, Component } from "react";
import "./App.css";
import NavBar from "./components/layout/NavBar";
import Alert from "./components/layout/Alert";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import axios from "axios";

class App extends React.Component {
  state = {
    users: [],
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
  //clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });
  // set alert by pushing it into the state
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 2000);
  };

  render() {
    const { users, loading, alert } = this.state;
    return (
      <div className="App">
        <NavBar />
        <div className="container">
          <Alert alert={alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            // gets length of users and if greater then 0 then true or else make it false'
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users loading={loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
