import React, { Component } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import axios from 'axios';

class Login extends Component {
	state = {
		email: '',
		password: ''
	};

	onSubmit = (e) => {
		e.preventDefault();
		let apiBaseURL = 'http://localhost:8080/';
		let payload = {
			email: this.state.email,
			password: this.state.password
		};
		console.log(payload);
		axios
      .post(`${apiBaseURL}login?email=${payload.email}&password=${payload.password}`)
      .catch(err => console.log('failed!', err))
			.then((response) => {
				console.log(response);
				if (response.status === 200) {
          console.log('Login successfull');
          
				} else if (response.status === 204) {
					console.log("Username and password don't match");
				} else {
					console.log('Username does not exist');
					alert('Username does not exist');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	onChangeEmail = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	onChangePassword = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	render() {
		return (
			<div>
				<LoginForm
					{...this.state}
					onChangeEmail={this.onChangeEmail}
					onChangePassword={this.onChangePassword}
					onSubmit={this.onSubmit}
				/>
			</div>
		);
	}
}

export default Login;
