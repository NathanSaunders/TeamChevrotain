import React from 'react';
import "./loginForm.css"
function LoginForm(props) {
	return (
		<div class="root-container ">
			<h1 class="header">Log-in to SnapDoc</h1>
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
