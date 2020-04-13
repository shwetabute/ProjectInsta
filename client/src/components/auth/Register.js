import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";
import "../layout/style_login.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
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
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    axios
      .post("/api/users/register", newUser)
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
                </div>
              </div>
            <div className="col">
              <div className="rightside"></div>        
                <form onSubmit={this.onSubmit}>
                <div className="login">
                <div>
                  <div className="wc_text">Sign Up to ProjectInsta</div><br/>
                  </div>
                    <input
                      type="text"
                      className={classnames("sign_up_text", {
                        "is-invalid": errors.name
                      })}
                      placeholder="Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                    <input
                      type="email"
                      className={classnames("sign_up_email", {
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
                      className={classnames("sign_up_email", {
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
                    <input
                      type="password"
                      className={classnames("sign_up_email", {
                        "is-invalid": errors.password2
                      })}
                      placeholder="Confirm Password"
                      name="password2"
                      value={this.state.password2}
                      onChange={this.onChange}
                    />
                    {errors.password2 && (
                      <div className="invalid-feedback">{errors.password2}</div>
                    )}

                    <input type="submit" className="btn_submit" value="Sign Up"/>
                  </div>
                </form>
              </div>
            </div>
          </div>
      );
    }
  }
  
  export default Register;
  