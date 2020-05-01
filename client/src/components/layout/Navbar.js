import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';


class Navbar extends Component {
  ProfilePicNav = "";
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
    // this.props.history.push("/");
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    //deconstruction
    
    const { isAuthenticated, user } = this.props.auth;
    const { profile } = this.props.profile;
    // console.log("This is user from navabr", JSON.stringify(user));
    // console.log("This is profile from navabr", JSON.stringify(profile?.user._id));
    if (profile && user?.id == profile?.user?._id) {
       this.ProfilePicNav = profile.profilePic
    }
    
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

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item ">
        <Link className="nav-link" to="/profiles">
          <i className="fas fa-users"> </i> Active Members
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/feed">
          <i class="fas fa-house-user"></i> HomePage
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={`/profile/${profile?.handle}`}>
          <i className="fas fa-user"> </i> Profile
          </Link>
        </li>
        <li className="nav-item dropdown dropleft">
        {/* <i class="fad fa-sign-out"></i> */}
          <a
        
            className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
          >
           { profile && (<img
              className="rounded-circle"
              src={this.ProfilePicNav?this.ProfilePicNav:user?.avatar}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
            />)}
          
          </a>
          <div className="dropdown-menu  " aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="/edit-profile"> Edit Profile</a>
          <a className="dropdown-item" onClick={this.onDeleteClick.bind(this)} href="#">Delete My Account</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" onClick={this.onLogoutClick.bind(this)} href="#">Logout</a>
        </div>
        </li>
      </ul>
      </div>
    );
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        {/* <div className="container"> */}
          <Link className="navbar-brand" to="/feed">
          <h3 className="header_size">Social<span className="insta_color">Net</span></h3>
          
    </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
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
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  //errors: PropTypes.object.isRequired,
};
 
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
});
 
export default connect(mapStateToProps, { logoutUser, getCurrentProfile, deleteAccount })(Navbar);