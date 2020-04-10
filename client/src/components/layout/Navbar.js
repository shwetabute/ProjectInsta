import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo LinkNav">
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
        </div>
      </nav>
    );
  }
}
export default Navbar;
