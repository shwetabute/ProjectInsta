import React, { Component } from "react";
import {Link} from 'react-router-dom';


class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
        {/* </div> */}
      </nav>
    );
  }
}
export default Navbar;