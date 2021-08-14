import React, { Component } from "react";

export class Search extends Component {
  state = {
    text: "",
  };

  //onSubmit function
  onSubmit = (e) => {
    // prevents the browser from refreshing
    e.preventDefault();
    // searchUsers is being passed as props to our API
    this.props.searchUsers(this.state.text);
    // setState to empty string   on submit is other words clears the search field.
    this.setState({ text: "" });
  };
  // onChange is used to update the state
  onChange = (e) =>
    // set states by e.target value "Text in this case since we have only one input field"
    this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input
            type="text"
            name="text"
            placeholder="Search Users..."
            // value this.state.text is for updating the state
            value={this.state.text}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
      </div>
    );
  }
}

export default Search;
