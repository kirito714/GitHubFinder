import React, { Fragment, Component } from "react";
import "./App.css";
import NavBar from "./components/layout/NavBar";
import Users from "./components/users/Users";
import axios from "axios";

class App extends React.Component {
  state = {
    users: [],
    loading: false,
  };
  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get("https://api.github.com/users");

    this.setState({ users: res.data, loading: false });
  }
  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="container">
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
