import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import classnames from "classnames";
import './style_login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post("/api/users/login", user)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="style_login">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link>  
        <div className="row no-gutters">
        <div className="col">
        <div className="leftside">
          <div className="body"></div>
		      {/* <div className="grad"></div> */}
		      {/* <div className="header">
			      <div>Project<span>Insta</span></div>
		      </div> */}
          </div>
        </div>
        <div className="col">
          <div className="rightside">
            <form onSubmit={this.onSubmit}>
              <div className="login">
                <div>
                <div className="wc_text">Login to ProjectInsta</div><br/>
                <input
                  type="email"
                  className={classnames("login_email", {
                    "is-invalid": errors.email
                  })}
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div><br/>
                <div>
                <input
                  type="password"
                  className={classnames("login_password", {
                    "is-invalid": errors.password
                  })}
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div><br/>
                <div>
                  <input type="submit" className="login_submit" value="Login"/>
                </div><br/><br/><br/>
                <div className="noaccount_text">Don't have an account?</div>
                <div>
                  <input type="submit" className="login_submit" value="Sign Up"/>
                  {/* <Link to="/register" className="sign_up">Sign Up</Link> */}
                </div><br/>
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