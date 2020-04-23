import React, { Component } from "react";
import axios from "axios";
// import classnames from "classnames";
import "./style.scss";
import TextFieldGroup from "../common/TextFieldGroup";
import loginImg from '../../login.svg';
import { Link } from 'react-router-dom';


class RstPswd extends Component  {
  constructor() {
    super();
    this.state = {
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
    const newpwd = {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    axios
      .post("api/users/rstpwd", newpwd)
      .then(res => { 
        alert("Congratulations! Your password has been changed successfully.");
        console.log(res.data)
        this.props.history.push('/login')
      })
      .catch(err => this.setState({ errors: err.response.data }));
  }
 

  render() {
    const { errors } = this.state;

    return (
      <div className="base-container" ref={this.props.containerRef}>
      <div className="header">Reset Password</div>
      <div className="content">
        <div className="image">
          <img src={loginImg}/>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="form">
              <div className="form-group">
              <TextFieldGroup
                  type="email"
                   placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                </div>
                <div className="form-group">
              <TextFieldGroup
                  type="password"
                   placeholder="New Password"
                    name="password"
                    value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                </div>
              <div className="form-group">
              <TextFieldGroup
                  type="password"
                   placeholder="Confirm New Password"
                    name="password2"
                    value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                </div>
                
                <input type="submit" className="btn btn-info btn-block mt-4"  />
               
          </div>
          </form>
          
        </div>
        
      </div>
      );
      
    }
    
}

export default RstPswd;