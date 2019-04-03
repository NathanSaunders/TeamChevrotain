import React, { Component } from "react";

class DashboardBody extends Component {
  class = {};

  render() {
	const retrievedEmail = localStorage.getItem('email')

    return (
      <div className="container">
        <h1>Hello, {retrievedEmail} </h1>
      </div>
    );
  }
}

export default DashboardBody;
