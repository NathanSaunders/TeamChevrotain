import React, { Component } from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import axios from "axios";

class Login extends Component {
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
    console.log("payload: " + payload.email);
    axios
      .post(apiBaseURL + "login", payload)
      .then(response => {
        console.log(response);
        if (response.data.code === 200) {
          console.log("Login successfull");
        } else if (response.data.code === 204) {
          console.log("Username and password don't match");
        } else {
          console.log("Username does not exist");
          alert("Username does not exist");
        }
      })
      .catch(err => {
        console.log(err);
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
      <div>
        <LoginForm {...this.state} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default Login;
