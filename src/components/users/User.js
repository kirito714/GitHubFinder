import React, { Component } from "react";

export class User extends Component {
  componentDidMount() {
    //  params of login is coming from the app.js  path="/user/:login"
    this.props.getUser(this.props.match.params.login);
  }
  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
    } = this.props.user;
    const { loading } = this.props;

    return <div>{name}</div>;
  }
}

export default User;
