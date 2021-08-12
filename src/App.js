import React, { Fragment, Component } from "react";
import "./App.css";
import NavBar from "./components/layout/NavBar";
import UserItem from "./components/users/UserItem";

class App extends React.Component {
  render() {
    return (
      <nav className="App">
        <NavBar />
        <UserItem />
      </nav>
    );
  }
}

export default App;
