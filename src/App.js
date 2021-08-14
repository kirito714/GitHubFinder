import React, { Fragment, Component } from "react";
import "./App.css";
import NavBar from "./components/layout/NavBar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import axios from "axios";

class App extends React.Component {
  state = {
    users: [],
    loading: false,
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

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="container">
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            // gets length of users and if greater then 0 then true or else make it false'
            showClear={this.state.users.length > 0 ? true : false}
          />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
