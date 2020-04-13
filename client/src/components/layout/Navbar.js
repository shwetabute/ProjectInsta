import React, { Component } from "react";
import {Link} from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
<<<<<<< HEAD
      <nav className="nav-wrapper">
        <Link to="/" className="brand-logo Logo">
          Instagram
        </Link>

        <ul className="right hide-on-med-and-down">
          <li>
            <Link to="/" className="#8FD8D8 LinkNav">
              Home
            </Link>
          </li>
          <li>
            <Link to="/register" className="LinkNav">
              Signup
            </Link>
          </li>
          <li>
            <Link to="/login" className="LinkNav">
              Login
            </Link>
          </li>
        </ul>
=======
      <nav className="navbar navbar-expand-sm navbar-dark bg_color">
        <div className="container">
          <Link className="navbar-brand" to="/">
			        <h3 className="header_size">Project<span className="insta_color">Insta</span></h3>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">          
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                {/* <Link className="nav-link" to="/login"> */}
                <Link className="nav-link" to="/">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
>>>>>>> master
      </nav>
    );
  }
}
export default Navbar;