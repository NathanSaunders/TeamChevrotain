import React from 'react';
import snapLogo from '../../assets/snap.png';



function RegisterForm(props) {
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
            <h2>Sign Up</h2>
            {/* <p className="lead">Lorem ipsum dolor sit amet, consectetur adipis.</p> */}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2 text-center margin-30 wow fadeIn" data-wow-delay="0.6s"> 
        <form onSubmit={props.onSubmit}>
                <div className="form-group row">
                    <label  className="col-sm-2 col-form-label white">Email</label>
                    <div className="col-sm-10">
                    <input 
                          type="email"
                          className="form-control" 
                          id="inputEmail3" 
                          name="email"
                          placeholder="Email"
                          id="email"
                          value={props.value}
                          onChange={props.onChangeEmail}
                       />
                    {/* <input
                                    id="email"
									type="text"
									name="email"
									value={props.value}
									onChange={props.onChangeEmail}
									placeholder="Email"
								/> */}
                    </div>
                </div>
                <div className="form-group row">
                    <label  className="col-sm-2 col-form-label white">Password</label>
                    <div className="col-sm-10">
                    <input 
                        id="password"
                        type="password" 
                        className="form-control" 
                        id="inputPassword3" 
                        placeholder="Password"
                        name="password"
                        onChange={props.onChangePassword}
								      	placeholder="Password"
                    />
                    {/* <input
                 id="password"
									type="password"
									name="password"
									value={props.value}
									onChange={props.onChangePassword}
									placeholder="Password"
								/> */}
                    </div>
                </div>
                <div className="form-group row">
    <div className="col-sm-10">
      {/* <input type="submit" className="btn btn-primary">Register</button> */}
      <input type="submit" value="Register" className="btn btn-primary" />

    </div>
  </div>
  </form>
  </div>
   </div>
        {/* <div className="iphone wow fadeInUp" data-wow-delay="1s">
	        <img src="https://d585tldpucybw.cloudfront.net/sfimages/default-source/default-album/renderstart.gif?sfvrsn=3d8cfee1_1"/>
        </div> */}
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

export default RegisterForm;