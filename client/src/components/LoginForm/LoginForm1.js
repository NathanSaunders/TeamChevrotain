import React from 'react';
//import "./loginForm.css"
//import "css/font-awesome.min.css";
import "./css/main.css"
//import "./css/bootstrap.min.css"

function LoginForm(props) {
	return (
		<div className="root-container ">
			
			<h1 className="header">Log-in to SnapDoc</h1>
			<ul className="nav navbar-nav navbar-right" id="mini1">
                        <li><a href="register" >Register</a></li>
                        <li><a href="login">Sign in</a></li>
						<li><a href="/">Home</a></li>
                    </ul>
			<div className="container box-container controller">
				<div className="row">
					<div className="col-md-12">
						<form onSubmit={props.onSubmit}>
							<div className="form-group">
							<label >Email:</label>
								<input
									type="text"
									name="email"
									value={props.value}
									onChange={props.onChangeEmail}
									placeholder="Email"
								/>
							</div>
							<div className="form-group">
							<label >Password:</label>
								<input
									type="password"
									name="password"
									value={props.value}
									onChange={props.onChangePassword}
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

export default LoginForm;

