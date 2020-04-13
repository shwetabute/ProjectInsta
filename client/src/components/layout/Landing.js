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
      // <div className="style_login">
      //   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link>  
      //   <div className="row no-gutters">
      //    <div className="col">
      //     <div className="leftside">
      //       <div className="body"></div>
      //     </div>
      //   </div>
        <div id="box">
            <div id="main"></div>
            <form onSubmit={this.onSubmit}>
            <div id="loginform">
                <h1>LOGIN</h1>
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
                             
                             <button>LOGIN</button>
                             </div>
                <div id="login_msg">Have an account?</div>
                <button id="login_btn">LOGIN</button>
               
                <div id="signup_msg">Don't have an account?</div>
                <Link className="nav-link" to="/register">
                <button id="signup_btn">SIGN UP</button>

                </Link><br/>
              </form>
              </div>
            
      //     </div>
      //   </div> 
      //   </div>     
      // </div>  
    );
  }
}

export default Login;