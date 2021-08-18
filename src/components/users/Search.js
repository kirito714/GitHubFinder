import React, { useState } from "react";
import PropTypes from "prop-types";

//destructuring showClear and clearUsers from props
const Search = ({ searchUsers, showClear, clearUsers, showAlert }) => {
  const [text, setText] = useState("");

  //onSubmit function
  const onSubmit = (e) => {
    // prevents the browser from refreshing
    e.preventDefault();
    // if statement to alert user when search input was submitted with a empty string ''s
    if (text === "") {
      showAlert("Please Enter something", "light");
    } else {
      // searchUsers is being passed as props to our API
      searchUsers(text);
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
        showClear && (
          <button className="btn btn-block btn-block" onClick={clearUsers}>
            Clear
          </button>
        )
      }
    </div>
  );
};
// propTypes for making sure that data is being passed correctly and receive it correctly as well.
Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default Search;
