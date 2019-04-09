import React from 'react';
import snapLogo from '../../assets/snap.png';


function LoginForm(props) {
	return (
      < div>
            <div className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">              
                    <div className="navbar-collapse collapse">
                    <div className="logo">
            <img src={snapLogo} alt='snap Logo' />
          </div>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="/" >Home</a></li>
                        <li><a href="register" >Register</a></li>
                        <li><a href="login">Sign in</a></li>
                    </ul>
                    </div>
                </div>
                </div>
                
            <section id="be-the-first" className="pad-sm">
      <div className="container">
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2 text-center margin-30 wow fadeIn" data-wow-delay="0.6s">
            <h2>Login</h2>
            {/* <p className="lead">Lorem ipsum dolor sit amet, consectetur adipis.</p> */}
          </div>
        </div>
        <div>
        <div className="col-sm-8 col-sm-offset-2 text-center margin-30 wow fadeIn" data-wow-delay="0.6s">
        <form onSubmit={props.onSubmit}>
                <div className="form-group row">
                    <label  className="col-sm-2 col-form-label white" id="inputEmail3">Email</label>
                    <div className="col-sm-10">
                    <input 
                            type="email" 
                            name="email"
                            className="form-control" 
                            id="inputEmail3" 
                            value={props.value}
                            onChange={props.onChangeEmail}
                            placeholder="Email"
                    />
                   
                    </div>
                </div>
                <div className="form-group row">
                    <label  className="col-sm-2 col-form-label white">Password</label>
                    <div className="col-sm-10">
                    <input 
                            type="password" 
                            name="password"
                            className="form-control" 
                            id="inputPassword3"
                            value={props.value}
							onChange={props.onChangePassword}
                            placeholder="Password"
                     />
                  
                    </div>
                </div>
                <div className="form-group row">
    <div className="col-sm-10">
      {/* <button type="submit" className="btn btn-primary">Sign in</button> */}
      <input type="submit" value="Log-In" className="btn btn-primary" />

    </div>
  </div>
  </form>
  </div>
                </div>
       
      </div>
    </section>
    
    <section id="main-info" className="pad-xl">
	    <div className="container">
		    <div className="row">
			    <div className="col-sm-4 wow fadeIn" data-wow-delay="0.4s">
				    <hr className="line purple"/>
				    <h3>Inspire.</h3>
				    <p>Have an idea? Use our document writer to blueprint!</p>
			    </div>
			    <div className="col-sm-4 wow fadeIn" data-wow-delay="0.8s">
				    <hr  className="line blue"/>
				    <h3>Collaborate.</h3>
				    <p>Share blueprints and codes with friends and colleagues. You can even utilize the app to teach classNamees!</p>
			    </div>
			    <div className="col-sm-4 wow fadeIn" data-wow-delay="1.2s">
				    <hr  className="line yellow"/>
				    <h3>Create.</h3>
				    <p>Turn your blueprints into reality! Double or triple your efficiency with friends!</p>
			    </div>
		    </div>
	    </div>
    </section>
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-sm-8 margin-20">
            <ul className="list-inline social">
              <li>Connect with us on</li>
              <li><a href="#"><i className="fa fa-twitter"></i></a></li>
              <li><a href="#"><i className="fa fa-facebook"></i></a></li>
              <li><a href="#"><i className="fa fa-instagram"></i></a></li>
            </ul>
          </div>
          <div className="col-sm-4 text-right">
            <p><small>Copyright &copy; 2019. All rights reserved. <br/>
	            Created by <a href="https://github.com/jadamsin3d/TeamChevrotain">Team Chevrotain</a></small></p>
          </div>
        </div>
      </div>
    </footer>
    </div>
    );
}

export default LoginForm;