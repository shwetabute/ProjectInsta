import React, { Component } from "react";

//import "../layout/style_login.css";
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import loginImg from "../../register1.svg";
import "./style.scss";
import '../../App.scss';
import TextFieldGroup from "../common/TextFieldGroup";

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

    this.props.registerUser(newUser, this.props.history);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;

    return (
      <div className="base-container" ref={this.props.containerRef}>
      <div className="header">Register</div>
      <div className="content">
        <div className="image">
          <img src={loginImg}/>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="form">
              <div className="form-group">
                <TextFieldGroup
                  type="text"
                   
                   placeholder="Name"
                    name="name"
                    value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
              {/* <input
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
                  )} */}
              </div>
              <div className="form-group">
              <TextFieldGroup
                  type="email"
                   
                   placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
              {/* <input
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
                  )} */}
             </div>
              <div className="form-group">
              <TextFieldGroup
                  type="password"
                   
                   placeholder="Password"
                    name="password"
                    value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                {/* <input
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
                )} */}
             </div>
              <div className="form-group">
              <TextFieldGroup
                  type="password"
                   
                   placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
              {/* <input
                  type="password"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.password2
                  })}
                  placeholder="Confirm Password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                />
                {errors.password2 && (
                  <div className="invalid-feedback">{errors.password2}</div>
                )} */}
             </div>
             <input type="submit" className="btn btn-info btn-block mt-4" />
          </div>
          </form>
        </div>
        
      </div>
      );
    }
  }
  
 Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  }

  const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(mapStateToProps, {registerUser})(Register);
 