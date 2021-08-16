import React from "react";
import PropTypes from "prop-types";
import RepoItem from "./RepoItem";

// pass in repos as a prop
const Repos = ({ repos }) => {
  // map over repos and return Repoitem with the repo and key of repo.id
  return repos.map((repo) => <RepoItem repo={repo} key={repo.id} />);
};
Repos.prototypes = {
  repos: PropTypes.array.isRequired,
};

export default Repos;
