import React, { Component } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';

class Login extends Component {
	state = {
		email: '',
		password: ''
	};

	onSubmit = (e) => {
		e.preventDefault();
		console.log('this was submitted');
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
                />
			</div>
		);
	}
}

export default Login;
