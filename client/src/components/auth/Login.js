import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import loginImg from '../../login.svg';
import './style.scss';
import '../../App.scss';
import  TextFieldGroup from '../common/TextFieldGroup';
import { Link } from "react-router-dom";

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
      password: this.state.password,
    };

    this.props.loginUser(user);

  }

  componentDidMount(){
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
      //document.body.style.background= 'pink';
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.auth.isAuthenticated){
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
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
                  {/* <div className="footer"> */}
                  <Link className="rstpwd" to="/reset">Forgot password?</Link>
                  <div>
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </div>
                  
              </div>
            </form>
          </div>
            
          </div>
          
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
//export default Login;