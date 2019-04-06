import React from 'react';
import "./registerForm.css"

function RegisterForm(props) {
	return (
		<div  class="root-container ">
			<h1 class="header">Register to Access SnapDocs</h1>
			<ul className="nav navbar-nav navbar-right" id="mini2">
                        <li><a href="register" >Register</a></li>
                        <li><a href="login">Sign in</a></li>
						<li><a href="/">Home</a></li>

                    </ul>
			<div className="container registerForm box-container">
				<div className="row">
					<div className="col-md-12">
						<form onSubmit={props.onSubmit}>
							<div className="form-group">
							<label >Email:</label>
								<input
                                    id="email"
									type="text"
									name="email"
									value={props.value}
									onChange={props.onChangeEmail}
									placeholder="Email"
								/>
							</div>
							<div className="form-group">
							<label >password:</label>
								<input
                                    id="password"
									type="password"
									name="password"
									value={props.value}
									onChange={props.onChangePassword}
									placeholder="Password"
								/>
							</div>
							<div className="form-group">
								<input type="submit" value="Register" className="btn btn-primary" />
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RegisterForm;
