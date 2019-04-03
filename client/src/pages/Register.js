import React, { Component } from "react";
import { withRouter } from "react-router";
import RegisterForm from "../components/LoginForm/LoginForm";
import axios from "axios";

class Register extends Component {
  state = {
      email: "",
      password: ""
  };

  onSubmit = e => {
    e.preventDefault();
    let apiBaseURL = "http://localhost:8080/";
    let payload = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(payload);
    axios
      .post(
        `${apiBaseURL}signup?email=${payload.email}&password=${
          payload.password
        }`
      )
      .catch(err => console.log("failed! ", err))
      .then(response => {
        response.json({
          message: "signup successful",
          email: response.email
        });
      });
  };

  onChangeEmail = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onChangePassword = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <RegisterForm
        {...this.state}
        onChangeEmail={this.onChangeEmail}
        onChangePassword={this.onChangePassword}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default Register;
