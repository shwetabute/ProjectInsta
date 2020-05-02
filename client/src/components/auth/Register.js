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
    
      this.props.history.push('/feed')
    
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
 