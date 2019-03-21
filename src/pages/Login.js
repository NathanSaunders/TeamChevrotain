import React, { Component } from 'react';

class Login extends Component {
	state = {
		email: '',
		password: ''
	};

	onSubmit = (e) => {
		console.log('this was submitted');
    };
    
    onChangeEmail = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    onChangePassword = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

	render() {
		return (
			<div>
				<div>
					<h1>Log-in to Chevrotain</h1>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<input
										type="text"
										name="email"
										value={this.state.value}
										onChange={this.onChangeEmail}
										placeholder="Email"
									/>
								</div>
								<div className="form-group">
									<input
										type="text"
										name="password"
										value={this.state.value}
										onChange={this.onChangePassword}
										placeholder="Password"
									/>
								</div>
								<div className="form-group">
									<input type="submit" value="Log-In" className="btn btn-primary" />
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
