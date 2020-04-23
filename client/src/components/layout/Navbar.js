import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";


class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }
  render() {
    //deconstruction
    const { isAuthenticated, user } = this.props.auth;

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                {/* <Link className="nav-link" to="/login"> */}
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
    );

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/feed">
          <i className="fas fa-plus"></i> Post Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
        {/* <i class="fad fa-sign-out"></i> */}
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
              title="you must have a gravatar connected to your email to display an image "
            />
            
            Logout
          </a>
        </li>
      </ul>
    );
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        {/* <div className="container"> */}
          <Link className="navbar-brand" to="/">
          <h3 className="header_size">Social<span className="insta_color">Net</span></h3>
          
    </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            // data-target="#mobile-nav"
            data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">          
          {isAuthenticated ? authLinks : guestLinks}
          </div>
        {/* </div> */}
      </nav>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  //errors: PropTypes.object.isRequired,
};
 
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
 
export default connect(mapStateToProps, { logoutUser })(Navbar);