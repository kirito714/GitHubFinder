import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  GET_REPOS,
  GET_USER,
  CLEAR_USERS,
} from "../types";

// sets up Variables for client and secret
let githubClientID;
let githubClientSecret;
// if statement to check if not reactApp
if (process.env.NODE_ENV !== "production") {
  githubClientID = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  //else look for GITHUB_CLIENT_ID/GITHUB_CLIENT_SECRET
  githubClientID = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  // search Github users from Search.js passed as props. on onSubmit.
  const searchUsers = async (text) => {
    // lading true gives us that spinnerGif when loading items.
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientID}&client_secret=${githubClientSecret}`
    );

    // users: res.data.items gives us our users from our api request.
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  // Get User
  // get  single github user
  const getUser = async (username) => {
    // lading true gives us that spinnerGif when loading items.
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClientID}&client_secret=${githubClientSecret}`
    );
    // users: res.data gives us our single user from our api request.
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };
  // get users repo
  const getUserRepos = async (username) => {
    // lading true gives us that spinnerGif when loading items.
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientID}&client_secret=${githubClientSecret}`
    );

    // users: res.data gives us our single user from our api request
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };

  // Clear users
  //clear users from state
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    // take in one prop of value
    // and pass in anything we want our app to have access to the entire app.
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
