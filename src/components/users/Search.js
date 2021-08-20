import React, { useState, useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import GithubContext from "../../context/github/githubContext";

//destructuring showClear and clearUsers from props
const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  const [text, setText] = useState("");

  //onSubmit function
  const onSubmit = (e) => {
    // prevents the browser from refreshing
    e.preventDefault();
    // if statement to alert user when search input was submitted with a empty string ''s
    if (text === "") {
      alertContext.setAlert("Please Enter something", "light");
    } else {
      // searchUsers is being passed as props to our API
      githubContext.searchUsers(text);
      // setState to empty string   on submit is other words clears the search field.
      setText(" ");
    }
  };
  // onChange is used to update the state
  const onChange = (e) =>
    // set states by e.target value "Text in this case since we have only one input field"
    setText(e.target.value);

  return (
    // onSubmit is passed to the onSubmit function
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Users..."
          // value this.state.text is for updating the state
          value={text}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>

      {
        // wrap our button with a expression saying :  && (true) then show the button
        githubContext.users.length > 0 && (
          <button
            className="btn btn-block btn-block"
            onClick={githubContext.clearUsers}
          >
            Clear
          </button>
        )
      }
    </div>
  );
};

export default Search;
