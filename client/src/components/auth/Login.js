import React, { Component } from 'react';
import axios from "axios";
import classnames from "classnames";
import loginImg from "../../login.svg";

export class Login extends Component {
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
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <form onSubmit={this.onSubmit}>
              <div className="form">
                <div className="form-group">
                  <input
                        type="email"
                        className={classnames("form-control form-control-lg", {
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
                </div>
                  <div className="form-group">
                    <input
                          type="password"
                          className={classnames("form-control form-control-lg", {
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
                  </div>
                  {/* <div className="footer"> */}
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  {/* </div> */}
                  
              </div>
            </form>
          </div>
            
          </div>
          
    );
  }
}

export default Login;

